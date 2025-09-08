'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { tournaments } from "@/storage"
import { Button } from "@/components/ui/button"
import { InfoIcon, LogIn, Settings, Shuffle, User } from "lucide-react"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Tournament() {
	const { id } = useParams()

	const router = useRouter()

	const [tournament, setTournament] = useState<Tournament | null>(null)

	useEffect(() => {
		const selectedTournament = tournaments.find(trnm => trnm.id === +id!)

		if (!selectedTournament) {
			router.push('/')
			return
		}

		setTournament(selectedTournament)
	}, [])

	if (!tournament) {
		return <div className="text-slate-500 italic text-sm">Aguarde...</div>
	}

	return (
		<div className="flex flex-col gap-6 pr-10 pb-16">
			<div
				className="w-full h-64 2xl:h-80 bg-cover bg-no-repeat bg-center rounded-lg relative"
				style={{ backgroundImage: `url(${tournament.image})` }}
			>
				<div className="bg-slate-800/60 absolute top-0 left-0 w-full h-full flex flex-col gap-6 p-8">
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
								<Link href={`/tournament/${tournament.id}/draw`} className="flex flex-col justify-center gap-1 2xl:gap-3">
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
										<Link href={`/tournament/${tournament.id}/draw`} className="flex flex-col justify-center gap-1 2xl:gap-3">
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

			<div className="grid grid-cols-[3fr_1fr] gap-10 mt-10">
				<div className="flex flex-col gap-8">
					<div className="flex flex-col gap-3 text-sm 2xl:text-sm rounded-md">
						<span>Local: {tournament.arena?.name} - {tournament.arena?.address}</span>
						<span>Data e horario: {tournament.datetime}</span>
						{tournament.price && <span>Valor por participante: R$ {tournament.price / 100}</span>}
						{tournament.offered_subscriptions && <span>Vagas: {tournament.offered_subscriptions} pessoas ({tournament.offered_subscriptions / 2} duplas)</span>}
					</div>

					<div className="flex flex-col gap-4 text-sm border-t border-slate-800 pt-5">
						<h2 className="font-semibold text-lg">Informações do torneio</h2>

						<div className="whitespace-pre-wrap text-base font-sans">
							{tournament.description}
						</div>

						{tournament.video && (
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
						)}
					</div>
				</div>

				<div className="flex flex-col gap-5 border-l-2 border-l-black/10 dark:border-l-white/10 pl-4 py-2">
					<h2 className="font-semibold text-lg">Organização</h2>

					{tournament.management.map(person => (
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
								{person.status?.tournament_management && <span className="text-slate-400 text-xs">Organizou outros {person.status.tournament_management} torneios</span>}
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