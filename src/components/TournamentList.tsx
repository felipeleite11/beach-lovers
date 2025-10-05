'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { ExternalLink, Mars, Venus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import Link from 'next/link'
import { fetchTournaments } from '@/lib/api'
import { Tournament } from '@/types/Tournament'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { format, isSameDay } from 'date-fns'
import { useRouter } from 'next/navigation'
import { pluralize } from '@/utils/string'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function TournamentList() {
	const router = useRouter()

	const { data: tournaments } = useQuery<Tournament[]>({
		queryKey: ['get-last-tournaments'],
		queryFn: async () => {
			const response = await fetchTournaments()

			return response
		},
		staleTime: 5 * 60 * 1000
	})

	function getStatusBadge(tournament: Tournament) {
		switch (tournament.status) {
			case 'created':
				return (
					<span className="text-[0.6rem] bg-white text-slate-800 rounded-md p-1 w-fit">
						{`Início das inscrições: ${format(new Date(tournament.subscription_start), 'dd/MM/yyyy hh:mm')}`}
					</span>
				)

			case 'available_subscription':
				return <span className="text-[0.6rem] bg-emerald-600 text-white rounded-md p-1 w-fit">INSCRIÇÕES ABERTAS</span>

			case 'cancelled':
				return <span className="text-[0.6rem] bg-red-500 text-white rounded-md p-1 w-fit">CANCELADO</span>

			case 'finished':
				return <span className="text-[0.6rem] bg-sky-500 text-white rounded-md p-1 w-fit">FINALIZADO</span>
		}
	}
	
	return (
		<div className="w-full xl:pr-8 flex flex-col gap-6 overflow-y-auto">
			<h1 className="font-semibold text-3xl">Torneios</h1>

			{tournaments?.map((tournament, idx) => {
				const isSubscriptionAvailable = tournament.status === 'available_subscription'
				const startDate = new Date(tournament.start_date)
				const endDate = new Date(tournament.end_date)
				const formattedStartDate = format(startDate, 'dd/MM/yyyy HH:mm\'h\'')
				const formattedEndDate = format(endDate, 'dd/MM/yyyy HH:mm\'h\'')

				return (
					<div key={tournament.id} className={cn(
						'flex flex-col gap-4 border-t border-t-slate-200 dark:border-t-slate-600 pt-2',
						`animate__animated animate__fadeInUp animate__faster delay-${idx * 100}`
					)}>
						<div className="flex justify-between gap-6">
							<div className="flex flex-col gap-2">
								<div className="flex flex-col gap-3 font-semibold mb-2">
									<Link href={`/tournament/${tournament.id}`} className="font-semibold text-xl hover:underline underline-offset-4">
										{tournament.title}
									</Link>

									{getStatusBadge(tournament)}
								</div>

								<span className="text-sm">
									Data: {isSameDay(startDate, endDate) ? 
										formattedStartDate : 
										`${formattedStartDate} a ${formattedEndDate}`}
								</span>

								<span className="text-sm">Inscrições: R$ {+tournament.price! / 100}</span>

								<span className="text-sm flex gap-2">
									Local: {tournament.arena?.name}

									{tournament.arena?.map_link && (
										<a href={tournament.arena.map_link} target="_blank">
											<ExternalLink size={15} className="cursor-pointer" />
										</a>
									)}
								</span>
							</div>

							<div className="flex flex-col items-end gap-2 group">
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											className="bg-orange-600 text-white cursor-pointer hover:bg-orange-500"
											onClick={() => {
												router.push(`/tournament/${tournament.id}/subscribe`)
											}}
											disabled={!isSubscriptionAvailable}
										>
											Inscrever-se
										</Button>
									</TooltipTrigger>

									{tournament.subscription_start === 'created' && (
										<TooltipContent side="bottom">
											As inscrições iniciam em {format(new Date(tournament.subscription_start), 'dd/MM/yyyy hh:mm')}
										</TooltipContent>
									)}
								</Tooltip>
							</div>
						</div>

						<div className="flex flex-col gap-3 text-sm">
							<span className="font-semibold">Categorias</span>

							<div className="flex flex-wrap gap-3">
								{tournament.categories?.map(category => {
									const subscriptionsOfCategory = tournament.subscriptions?.filter(subscription => subscription.category_id === category.id) || []
									const totalSlots = tournament.slots?.filter(slot => slot.category_id === category.id).length || 0
									const remainingSlots = totalSlots - subscriptionsOfCategory?.length

									return (
										<Sheet key={category.id}>
											<SheetTrigger>
												<div className="flex flex-col gap-1 items-center border border-slate-400 dark:border-slate-600 rounded-md w-fit py-2 px-3 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer transition-all">
													<span className="flex items-center gap-2">
														{category.name.toLowerCase().includes('masc') ? (
															<Mars size={16} />
														) : category.name.toLowerCase().includes('fem') ? (
															<Venus size={16} />
														) : null}

														{category.name}
													</span>

													{!!subscriptionsOfCategory?.length ? (
														<span className="text-slate-400">
															{pluralize(subscriptionsOfCategory, { singularTerm: 'inscrito' })}
														</span>
													) : (
														<span className="italic text-slate-400 text-xs">Nenhum inscrito</span>
													)}
												</div>
											</SheetTrigger>

											<SheetContent side="right">
												<SheetHeader>
													<SheetTitle>{category.name}</SheetTitle>

													{!!remainingSlots && (
														<span className="text-slate-400 text-xs">
															Restam {remainingSlots} vagas
														</span>
													)}

													<SheetDescription asChild>
														<div className="mt-6">
															{!!subscriptionsOfCategory?.length ? (
																<ul className="flex flex-col gap-2 max-h-36 overflow-y-auto">
																	{subscriptionsOfCategory?.map(subscription => {
																		const person = subscription.person

																		return (
																			(
																				<li key={subscription.id}>
																					<Link href={`/person/${person.slug}`} className="flex items-center gap-2 cursor-pointer hover:opacity-80 w-fit text-slate-700 dark:text-slate-300">
																						<Avatar className="w-8 h-8">
																							<AvatarImage src={person.image} />
																							<AvatarFallback>{person.name[0].toUpperCase()}</AvatarFallback>
																						</Avatar>

																						<span className="text-sm">{person.name}</span>
																					</Link>
																				</li>
																			)
																		)
																	})}
																</ul>
															) : (
																<span className="italic text-slate-400">Nenhum inscrito</span>
															)}
														</div>
													</SheetDescription>
												</SheetHeader>
											</SheetContent>
										</Sheet>
									)
								})}
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}
