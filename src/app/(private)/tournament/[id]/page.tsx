'use client'

import Link from "next/link"
import { useParams } from "next/navigation"
import { format } from "date-fns"
import { ExternalLink, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Tournament as TournamentType } from "@/types/Tournament"
import { useQuery } from "@tanstack/react-query"
import { fetchTournamentById } from "@/lib/api"
import Script from "next/script"

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

	const totalSlots = tournament.categories.reduce((total, { slots }) => total + slots, 0)

	return (
		<div className="flex flex-col gap-6">
			<div className="grid grid-cols-[3fr_1fr] gap-10 mt-3">
				<div className="flex flex-col gap-8">
					<div className="flex flex-col gap-3 text-sm 2xl:text-sm rounded-md">
						<div className="flex gap-2">
							<span className="font-semibold">Local:</span> {tournament.arena?.name} - {tournament.arena?.address}

							<Link href={`/arena/${tournament.arena?.id}`}>
								<ExternalLink size={16} />
							</Link>
						</div>

						<div>
							<span className="font-semibold">Data e horário:</span> {format(new Date(tournament.start_date), 'dd/MM/yyyy hh:mm\'\h\'')}
						</div>

						{tournament.price && (
							<div>
								<span className="font-semibold">Valor por participante:</span> R$ {+tournament.price / 100}
							</div>
						)}

						<div>
							<span className="font-semibold">Categorias abertas:</span> {tournament.categories.map(({ category }) => category.name).join(', ')}
						</div>

						<div>
							<span className="font-semibold">Vagas:</span> {totalSlots} pessoas ({totalSlots / 2} duplas)
						</div>
					</div>

					<div className="flex flex-col gap-4 text-sm border-t border-slate-300 dark:border-slate-700 pt-5">
						<h2 className="font-semibold text-lg">Informações do torneio</h2>

						<div className="whitespace-pre-wrap text-base font-sans">
							{tournament.description}
						</div>

						{tournament.video && (
							<iframe
								width="560"
								height="315"
								src={tournament.video}
								title="Chamada para o torneio"
								allow="accelerometer; encrypted-media; gyroscope"
							/>
						)}
					</div>
				</div>

				<div className="flex flex-col gap-5 border-l-2 border-l-black/10 dark:border-l-white/10 pl-4 py-2">
					<h2 className="font-semibold text-lg">Organização</h2>

					{tournament.management?.map(person => (
						<Link key={person.id} href={`/person/${person.slug}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
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
								<span className="font-semibold text-sm">{person.name}</span>
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