'use client'

import React, { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { InfoIcon, LogIn, MoreHorizontalIcon, Settings, Shuffle, X } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { ButtonGroup } from "@/components/ui/button-group"
import { Tournament } from '@/types/Tournament'
import { fetchTournamentById, removeSubscription } from '@/lib/api'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { authClient } from '@/lib/auth.client'
import { queryClient } from './Providers'
import { toast } from 'sonner'

export default function TournamentHeader() {
	const { id } = useParams<{ id: string }>()

	const [isManager, setIsManager] = useState<boolean | null>(null)
	const [subscription, setSubscription] = useState<Subscription | null | undefined>(undefined)

	const { data: tournament } = useQuery<Tournament>({
		queryKey: ['fetch-tournament-by-id'],
		queryFn: async () => {
			const foundTournament = await fetchTournamentById(String(id))

			const { data: session } = await authClient.getSession()

			setIsManager(foundTournament.management.some(manager => manager.userId === session?.user.id))
			setSubscription(foundTournament.subscriptions.find(subscription => subscription.person.userId === session?.user.id) || null)

			return foundTournament
		}
	})

	const { mutate: handleCancelSubscription } = useMutation({
		mutationFn: async () => {
			if(subscription) {
				await removeSubscription({
					id: subscription.id
				})
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['fetch-tournament-by-id']
			})

			toast.success('Sua inscrição foi cancelada!')
		},
		onError: error => {
			toast.error(error?.message || ' Ocorreu um erro ao cadastrar o torneio.')
		}
	})

	if (!tournament) {
		return (
			<Skeleton className="h-64 w-full rounded-lg" />
		)
	}

	return (
		<div
			className="w-full h-56 2xl:h-80 transition-all bg-cover bg-no-repeat bg-center rounded-lg relative animate__animated animate__fadeIn animate__fast"
			style={{ backgroundImage: `url(${tournament.image})` }}
		>
			<div className="bg-slate-800/30 absolute top-0 left-0 w-full h-full flex flex-col gap-6 p-8">
				<h1 className="text-xl 2xl:text-3xl font-bold text-white bg-slate-900/80 p-4 rounded-md w-fit shadow-lg">{tournament.title}</h1>

				<div className="flex gap-24 items-end -bottom-8 absolute">
					{/* Public options */}
					<div className="flex gap-6">
						{subscription === null ? (
							<Button
								asChild
								className="bg-emerald-700 hover:bg-emerald-800 text-white hover:text-white h-20 2xl:h-20 w-32 transition-all"
							>
								<Link 
									href={`/tournament/${tournament.id}/subscribe`} 
									className="flex flex-col justify-center gap-1 2xl:gap-3"
								>
									<LogIn />
									Inscrever-se
								</Link>
							</Button>
						) : !!subscription ? (
							<Button
								className="bg-red-600 hover:bg-red-700 text-white hover:text-white h-20 2xl:h-20 w-48 transition-all flex flex-col justify-center gap-1 2xl:gap-3"
								onClick={() => { handleCancelSubscription() }}
							>
								<X />
								Cancelar minha inscrição
							</Button>
						) : null}
					</div>

					{/* Manager options */}
					{isManager === true ? (
						<div className="flex gap-6 items-center">
							<ButtonGroup>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button>
											Administrar
											<MoreHorizontalIcon />
										</Button>
									</DropdownMenuTrigger>

									<DropdownMenuContent align="end">
										<DropdownMenuGroup>
											<DropdownMenuItem className="cursor-pointer" asChild>
												<Link href={`/tournament/${tournament.id}/formation_mode`}>
													<Shuffle />
													Definição das duplas / equipes
												</Link>
											</DropdownMenuItem>

											<DropdownMenuItem className="cursor-pointer" asChild>
												<Link href={`/tournament/${tournament.id}/info`}>
													<InfoIcon />
													Publicar informativo
												</Link>
											</DropdownMenuItem>

											<DropdownMenuItem className="cursor-pointer" asChild>
												<Link href={`/tournament/${tournament.id}/edit`} className="flex items-center">
													<Settings />
													Alterar dados do torneio
												</Link>
											</DropdownMenuItem>
										</DropdownMenuGroup>
									</DropdownMenuContent>
								</DropdownMenu>
							</ButtonGroup>
						</div>
					) : null}
				</div>
			</div>
		</div>
	)
}
