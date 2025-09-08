'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { tournaments } from '@/storage'
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { InfoIcon, LogIn, Settings, Shuffle } from "lucide-react"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton"

export default function TournamentHeader() {
	const { id } = useParams()

	const { data: tournament } = useQuery<Tournament>({
		queryKey: ['find-tournament-by-id'],
		queryFn: async () => {
			const foundTournament = tournaments.find(tournament => tournament.id === +id!)

			return foundTournament!
		}
	})

	if (!tournament) {
		return (
			<Skeleton className="h-64 w-full rounded-lg" />
		)
	}

	return (
		<div
			className="w-full h-56 2xl:h-80 transition-all bg-cover bg-no-repeat bg-center rounded-lg relative"
			style={{ backgroundImage: `url(${tournament.image})` }}
		>
			<div className="bg-slate-800/30 absolute top-0 left-0 w-full h-full flex flex-col gap-6 p-8">
				<h1 className="text-xl 2xl:text-3xl font-bold text-white bg-black/60 p-4 rounded-md w-fit shadow-lg">{tournament.title}</h1>

				<div className="flex gap-24 items-end -bottom-8 absolute">
					{/* Public options */}
					<div className="flex gap-6 items-center">
						<Button
							asChild
							className="bg-emerald-700 hover:bg-emerald-800 text-white hover:text-white h-20 2xl:h-20 w-32 transition-all"
						>
							<Link href={`/tournament/${tournament.id}/subscribe`} className="flex flex-col justify-center gap-1 2xl:gap-3">
								<LogIn />
								Inscrever-se
							</Link>
						</Button>
					</div>

					{/* Manager options */}
					<div className="flex gap-6 items-center">
						<Button
							asChild
							className="bg-orange-700 hover:bg-orange-800 text-white hover:text-white h-16 2xl:h-16 transition-all"
						>
							<Link href={`/tournament/${tournament.id}/draw`} className="flex flex-col justify-center gap-1 2xl:gap-3">
								<Shuffle />
								Iniciar sorteio das duplas
							</Link>
						</Button>

						<Button
							asChild
							className="bg-sky-700 hover:bg-sky-800 text-white hover:text-white h-16 2xl:h-16 transition-all"
						>
							<Link href={`/tournament/${tournament.id}/info`} className="flex flex-col justify-center gap-1 2xl:gap-3">
								<InfoIcon />
								Publicar informativo
							</Link>
						</Button>

						<Tooltip>
							<TooltipTrigger>
								<Button
									asChild
									className="bg-yellow-700 hover:bg-yellow-800 text-white hover:text-white h-16 2xl:h-16 transition-all"
								>
									<Link href={`/tournament/${tournament.id}/edit`} className="flex flex-col justify-center gap-1 2xl:gap-3">
										<Settings />
										Alterar dados do torneio
									</Link>
								</Button>
							</TooltipTrigger>

							<TooltipContent>
								<p>Alterar local, data, horário, etc.</p>
							</TooltipContent>
						</Tooltip>
					</div>
				</div>
			</div>
		</div>
	)
}
