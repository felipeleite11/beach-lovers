'use client'

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"
import { useQuery } from "@tanstack/react-query"
import { tournaments } from "@/storage"
import { Skeleton } from "@/components/ui/skeleton"
import { groupIntoCouples, shuffle } from "@/utils/array"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Play, RotateCw } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Tournament } from "@/types/Tournament"

export default function Draw() {
	const { id } = useParams<{ id: string }>()

	const router = useRouter()

	const [isSubscriptionsOk, setIsSubscriptionsOk] = useState(false)
	const [drawnPairs, setDrawnPairs] = useState<null | Pair[]>(null)

	const { data: tournament } = useQuery<Tournament>({
		queryKey: ['find-tournament-by-id'],
		queryFn: async () => {
			const foundTournament = tournaments.find(tournament => tournament.id === +id!)

			if (!foundTournament) {
				toast.error('Torneio não encontrado!')

				router.back()
				return
			}

			return foundTournament!
		}
	})

	function validateSubscriptionsList(subscriptions: Subscription[]) {
		if (!subscriptions?.length) {
			toast.warning('Este torneio não tem nenhuma inscrição.')

			router.back()
			return false
		}

		const isSubscriptionsCountPair = subscriptions.length % 2 === 0

		if (!isSubscriptionsCountPair) {
			toast.warning('Para fazer o sorteio, a quantidade de pessoas deve ser par.')

			router.back()
			return false
		}

		const malePeople = subscriptions.filter(subscription => subscription.person.gender === 'M')
		const femalePeople = subscriptions.filter(subscription => subscription.person.gender === 'F')

		if(malePeople.length !== femalePeople.length) {
			toast.warning('A quantidade de homens é diferente da quantidade de mulheres.')

			router.back()
			return false
		}

		return true
	}

	function drawPairs() {
		let people = tournament!.subscriptions!.map(subscription => subscription.person)

		people = shuffle(people)

		const pairs = groupIntoCouples(people)

		setDrawnPairs(pairs)
	}

	function resetDraw() {
		setDrawnPairs(null)
	}

	useEffect(() => {
		if (tournament) {
			const validationResult = validateSubscriptionsList(tournament.subscriptions!)

			setIsSubscriptionsOk(validationResult)
		}
	}, [tournament])

	if (!tournament) {
		return (
			<Skeleton className="h-40 w-full rounded-lg" />
		)
	}

	const subscribedPeople = shuffle(tournament.subscriptions?.map(subscription => subscription.person)!)

	return (
		<div className="flex flex-col gap-6">
			<h1 className="font-semibold text-2xl">Sorteio de duplas</h1>

			{isSubscriptionsOk && !drawnPairs ? (
				<>
					{isSubscriptionsOk && !drawnPairs && (
						<div className="flex flex-col gap-4">
							Tudo pronto para iniciar o sorteio.
						</div>
					)}

					<Button
						className="bg-yellow-400 dark:bg-yellow-300 hover:bg-yellow-500 dark:hover:bg-yellow-400 text-slate-800 cursor-pointer h-24 w-48 flex flex-col self-center"
						disabled={!isSubscriptionsOk}
						onClick={drawnPairs ? resetDraw : drawPairs}
					>
						<Play size={24} />
						Iniciar sorteio
					</Button>

					<div className="flex flex-col gap-4">
						<span className="text-lg font-semibold">{subscribedPeople?.length} pessoas inscritas</span>

						<div className="flex flex-wrap relative ml-4">
							{subscribedPeople?.map((person, idx) => (
								<Link href={`/person/${person.slug}`} key={person.id} className="flex flex-col items-center gap-1 group">
									<Avatar className={cn(`w-24 h-24 -ml-4 animate__animated animate__fadeInUp delay-${idx * 100} group-hover:-mt-4 transition-all cursor-pointer`)}>
										<AvatarImage src={person.image} className="object-cover w-full" />
										<AvatarFallback>{person.name[0].toUpperCase()}</AvatarFallback>
									</Avatar>

									<span className="font-semibold text-slate-300 dark:text-slate-400 text-xs hidden group-hover:block w-20 text-center -ml-4">🏅#{person.id}</span>
									<span className="text-xs font-semibold hidden group-hover:block w-20 text-center -ml-4">{person.name}</span>
								</Link>
							))}
						</div>
					</div>
				</>
			) : drawnPairs ? (
				<div className="flex gap-16">
					<Button
						className="bg-yellow-400 dark:bg-yellow-300 hover:bg-yellow-500 dark:hover:bg-yellow-400 text-slate-800 cursor-pointer h-24 w-48 flex flex-col"
						disabled={!isSubscriptionsOk}
						onClick={resetDraw}
					>
						<RotateCw size={24} />
						Refazer sorteio
					</Button>

					{drawnPairs && (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-40">
							{drawnPairs.map((pair, idx) => (
								<div className="flex justify-between gap-6 relative" key={idx}>
									<Avatar className={cn(`w-24 h-24 animate__animated animate__fadeInUp`)}>
										<AvatarImage src={pair[0].image} className="object-cover w-full" />
										<AvatarFallback>{pair[0].name[0].toUpperCase()}</AvatarFallback>
									</Avatar>

									<Avatar className={cn(`w-24 h-24 absolute left-20 top-6 shadow-md animate__animated animate__fadeInUp delay-[200ms]`)}>
										<AvatarImage src={pair[1].image} className="object-cover w-full" />
										<AvatarFallback>{pair[1].name[0].toUpperCase()}</AvatarFallback>
									</Avatar>

									<div className="flex flex-col absolute top-24 w-48">
										<span className={cn(`text-lg bg-white dark:bg-transparent py-1 px-2 rounded-md w-fit font-bold animate__animated animate__fadeInUp`)}>{pair[0].name}</span>
										<span className={cn(`text-md bg-white dark:bg-transparent py-1 px-2 rounded-md w-fit font-bold ml-1 -mt-2 animate__animated animate__fadeInUp delay-[200ms]`)}>&</span>
										<span className={cn(`text-lg bg-white dark:bg-transparent py-1 px-2 rounded-md w-fit font-bold ml-6 -mt-7 animate__animated animate__fadeInUp delay-[200ms]`)}>{pair[1].name}</span>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			) : 'Aguarde...'}
		</div>
	)
}

{/* <TournamentDrawResultVoice drawnPairs={drawnPairs} /> */ }