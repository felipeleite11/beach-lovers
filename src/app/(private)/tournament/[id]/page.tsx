'use client'

import Link from "next/link"
import { useParams } from "next/navigation"
import { ExternalLink, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Tournament as TournamentType } from "@/types/Tournament"
import { useQuery } from "@tanstack/react-query"
import { fetchTournamentById } from "@/lib/api"
import { format } from "date-fns"

export default function Tournament() {
	const { id } = useParams<{ id: string }>()

	const { data: tournament } = useQuery<TournamentType>({
		queryKey: ['fetch-tournament-by-id'],
		queryFn: async () => {
			const foundTournament = await fetchTournamentById(String(id))

			return foundTournament
		}
	})

	if (!tournament) {
		return (
			<div className="grid grid-cols-[3fr_16rem] gap-8 items-start mt-4">
				<div className="flex flex-col gap-3">
					<Skeleton className="h-11 w-full rounded-lg" />
					<Skeleton className="h-11 w-full rounded-lg" />
					<Skeleton className="h-11 w-full rounded-lg" />
					<Skeleton className="h-11 w-full rounded-lg" />
				</div>

				<div className="flex flex-col gap-4">
					<div className="flex items-center gap-2">
						<Skeleton className="h-12 w-12 rounded-full aspect-square" />
						<Skeleton className="h-8 w-full rounded-md" />
					</div>

					<div className="flex items-center gap-2">
						<Skeleton className="h-12 w-12 rounded-full aspect-square" />
						<Skeleton className="h-8 w-full rounded-md" />
					</div>
				</div>

				<div className="flex flex-col gap-3">
					<Skeleton className="h-36 w-full rounded-lg" />
					<Skeleton className="h-11 w-full rounded-lg" />
					<Skeleton className="h-11 w-full rounded-lg" />
				</div>
			</div>
		)
	}

	return (
		<div className="flex flex-col gap-6">
			<div className="grid grid-cols-[3fr_1fr] gap-10 mt-3">
				<div className="flex flex-col gap-8">
					<div className="flex flex-col gap-3 text-sm 2xl:text-sm rounded-md">
						<span className="flex gap-2">
							Local: {tournament.arena?.name} - {tournament.arena?.address}
							
							<Link href={`/arena/${tournament.arena?.id}`}>
								<ExternalLink size={16} />
							</Link>
						</span>

						<span>Data e horário: {format(new Date(tournament.start_date), 'dd/MM/yyyy hh:mm\'\h\'')}</span>
						{tournament.price && <span>Valor por participante: R$ {+tournament.price / 100}</span>}
						{/* {tournament.offered_subscriptions && <span>Vagas: {tournament.offered_subscriptions} pessoas ({tournament.offered_subscriptions / 2} duplas)</span>} */}
					</div>

					<div className="flex flex-col gap-4 text-sm border-t border-slate-800 pt-5">
						<h2 className="font-semibold text-lg">Informações do torneio</h2>

						<div className="whitespace-pre-wrap text-base font-sans">
							{tournament.description}
						</div>

						{/* {tournament.video && (
							<div className="h-[24rem] w-[40rem]">
								<iframe
									src={tournament.video}
									title="Chamada para o torneio"
									className="w-full h-full"
									allow="accelerometer; encrypted-media; gyroscope; web-share"
									referrerPolicy="strict-origin-when-cross-origin"
									allowFullScreen
								/>
							</div>
						)} */}
					</div>
				</div>

				<div className="flex flex-col gap-5 border-l-2 border-l-black/10 dark:border-l-white/10 pl-4 py-2">
					<h2 className="font-semibold text-lg">Organização</h2>

					{tournament.management?.map(person => (
						<Link key={person.id} href={`/profile/${person.slug}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
							{person.image ? (
								<Avatar className="w-12 h-12 2xl:w-14 2xl:h-14">
									<AvatarImage src={person.image} className="object-cover" />
									<AvatarFallback>{person.name[0].toUpperCase()}</AvatarFallback>
								</Avatar>
							) : (
								<div className="flex justify-center items-center bg-sky-600 w-12 h-12 2xl:w-14 2xl:h-14 rounded-full">
									<User size={36} className="text-white" />
								</div>
							)}

							<div className="flex flex-col gap-1">
								<span className="font-semibold text-md">{person.name}</span>
								{/* {person.status?.tournament_management && <span className="text-slate-400 text-xs">Organizou outros {person.status.tournament_management} torneios</span>} */}
							</div>
						</Link>
					))}
				</div>

				{/* Endereço */}

				{/* Organização */}
			</div>
		</div>
	)
}