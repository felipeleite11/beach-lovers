'use client'

import { useEffect, useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import { Check, ChevronsUpDown, Eraser, Edit, CheckCircle } from "lucide-react"
import { useParams } from "next/navigation"
import { fetchTournamentById } from "@/lib/api"
import { useQuery, useMutation } from "@tanstack/react-query"
import { Person } from "@/types/Person"
import { Tournament } from "@/types/Tournament"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { groupInPairs } from "@/utils/array"
import { cn } from '@/lib/utils'
import { defineTeams } from '@/lib/api'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut
} from "@/components/ui/command"
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type FormValues = {
	pairs: Person[]
}

export default function Manual() {
	const { id } = useParams<{ id: string }>()

	const [pairsConfirmation, setPairsConfirmation] = useState<Person[][]>(null)

	const { control, register, handleSubmit, reset, setValue, getValues, watch } = useForm<FormValues>({
		defaultValues: {
			pairs: []
		}
	})

	const { fields } = useFieldArray({
		control,
		name: 'pairs'
	})

	const onSubmit: SubmitHandler<FormValues> = data => {
		let { pairs } = data

		pairs = groupInPairs(pairs)

		const players = tournament?.subscriptions.map(subs => subs.person)

		setPairsConfirmation(pairs.map(pair => [
			players.find(player => player.name.toLowerCase() === pair[0].name),
			players.find(player => player.name.toLowerCase() === pair[1].name)
		]))
	}

	const { data: tournament } = useQuery<Tournament>({
		queryKey: ['fetch-tournament-by-id'],
		queryFn: async () => {
			const foundTournament = await fetchTournamentById(id)

			return foundTournament
		}
	})

	const { mutate: handleConfirmPairs } = useMutation({
		mutationFn: async () => {
			await defineTeams({
				tournament: tournament.id,
				pairs: pairsConfirmation.reduce((result, pair) => {
					return [
						...result,
						[
							{ id: pair[0].id, name: pair[0].name },
							{ id: pair[1].id, name: pair[1].name }
						]
					]
				}, [] as Partial<Person>[][])
			})
		},
		onSuccess: () => {
			toast.success('As duplas / equipes foram definidas com sucesso!')

			router.replace(`/tournament/${id}`)
		},
		onError: error => {
			toast.error(error?.message || 'Ocorreu um erro ao definir as duplas / equipes.')
		}
	})

	useEffect(() => {
		if (tournament) {
			reset({
				pairs: tournament.subscriptions.map(() => ({
					name: ''
				}))
			})
		}
	}, [tournament])

	function handleBackToEditMode() {
		setPairsConfirmation(null)
	}

	const players = tournament?.subscriptions.map(subs => ({
		...subs.person,
		value: subs.person.name.toLowerCase(),
		label: subs.person.name
	}))

	const includedNames = getValues('pairs').map(item => item.name)
	const isReady = includedNames.every(Boolean)
	
	return (
		<div className="flex flex-col gap-6">
			<h1 className="font-semibold text-2xl">Defina as duplas / equipes manualmente</h1>

			{players && !pairsConfirmation && (
				<>
					<p className="text-sm">Preencha todos as vagas com os atletas correspondentes.</p>
				
					<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 w-[40rem] items-end">
						{fields.map((field, index) => {
							const currentValue = getValues(`pairs.${index}.name`)
							const currentValueImage = players.find(player => player.value === currentValue)?.image
							const hasTitle = index % 2 === 0

							return (
								<div className="flex flex-col gap-2" key={field.id}>
									{hasTitle && (
										<span className="font-semibold text-md col-span-2">
											<h2>
												Dupla {index / 2 + 1}
											</h2>
										</span>
									)}

									<div className="grid grid-cols-[1.6rem_14rem_1rem] gap-2">
										{/* Necessário para funcionarem os selects */}
										<span className="hidden">{watch(`pairs.${index}.name`)}</span>

										<Popover>
											{currentValueImage && (
												<Avatar className="w-10 h-10">
													<AvatarImage src={currentValueImage} className="object-cover" />
													<AvatarFallback>?</AvatarFallback>
												</Avatar>
											)}

											<PopoverTrigger asChild>
												<Button
													variant="outline"
													role="combobox"
													aria-expanded={open}
													className="w-56 justify-between self-end"
												>
													{currentValue ? 
														players.find(participant => participant.value === currentValue.toLowerCase())?.label : 
														'Selecione...'}
													<ChevronsUpDown className="opacity-50" />
												</Button>
											</PopoverTrigger>

											<PopoverContent className="w-56 p-0">
												<Command>
													<CommandInput placeholder="Digite o nome..." className="h-9" />
													<CommandList>
														<CommandEmpty>Atleta não encontrado.</CommandEmpty>

														<CommandGroup>
															{players.map(player => (
																<CommandItem
																	key={player.value}
																	value={player.value}
																	onSelect={value => {
																		setValue(`pairs.${index}.name`, value)
																	}}
																	disabled={includedNames.includes(player.value)}
																>
																	<div className="grid grid-cols-[3rem_auto] items-center">
																		<Avatar className="w-9 h-9">
																			<AvatarImage src={player.image} className="object-cover" />
																			<AvatarFallback>{player.name[0].toUpperCase()}</AvatarFallback>
																		</Avatar>

																		<span>{player.label}</span>
																	</div>

																	<Check
																		className={cn(
																			"ml-auto",
																			currentValue === player.value ? "opacity-100" : "opacity-0"
																		)}
																	/>
																</CommandItem>
															))}
														</CommandGroup>
													</CommandList>
												</Command>
											</PopoverContent>
										</Popover>

										{currentValue && (
											<Button 
												size="icon" 
												type="button"
												className="ml-0 w-9 h-9 self-end"
												onClick={() => {
													setValue(`pairs.${index}.name`, '')
												}}
											>
												<Eraser />
											</Button>
										)}
									</div>
								</div>
							)
						})}

						<Button type="submit" disabled={!isReady} className="justify-self-end col-start-2 w-full mt-4">
							Concluir
							<Check />
						</Button>
					</form>
				</>
			)}

			{pairsConfirmation && (
				<div className="flex flex-col gap-8 animate__animated animate__fadeIn">
					<span className="text-sm">Confirme as duplas formadas.</span>
						
					<div className="flex flex-wrap gap-x-10 gap-y-24 mb-16">
						{pairsConfirmation.map((pair, idx) => (
							<div className="flex justify-between gap-6 relative w-44" key={idx}>
								<Avatar className={cn(`w-20 h-20 md:w-24 md:h-24 animate__animated animate__fadeInUp`)}>
									<AvatarImage src={pair[0].image} className="object-cover w-full" />
									<AvatarFallback>{pair[0].name[0].toUpperCase()}</AvatarFallback>
								</Avatar>

								<Avatar className={cn(`w-20 h-20 md:w-24 md:h-24 absolute left-16 md:left-20 top-6 shadow-md animate__animated animate__fadeInUp delay-[200ms]`)}>
									<AvatarImage src={pair[1].image} className="object-cover w-full" />
									<AvatarFallback>{pair[1].name[0].toUpperCase()}</AvatarFallback>
								</Avatar>

								<div className="flex flex-col absolute top-24 w-48">
									<span className={cn(`text-md md:text-lg bg-white dark:bg-transparent py-1 px-2 rounded-md w-fit font-bold animate__animated animate__fadeInUp`)}>{pair[0].name}</span>
									<span className={cn(`text-sm md:text-md bg-white dark:bg-transparent py-1 px-2 rounded-md w-fit font-bold ml-1 -mt-2 animate__animated animate__fadeInUp delay-[200ms]`)}>&</span>
									<span className={cn(`text-md md:text-lg bg-white dark:bg-transparent py-1 px-2 rounded-md w-fit font-bold ml-6 -mt-7 animate__animated animate__fadeInUp delay-[200ms]`)}>{pair[1].name}</span>
								</div>
							</div>
						))}
					</div>

					<div className="flex flex-col md:flex-row gap-4 justify-end">
						<Button onClick={handleConfirmPairs}>
							Confirmar as duplas / equipes
							<CheckCircle />
						</Button>

						<Button onClick={handleBackToEditMode}>
							Alterar
							<Edit />
						</Button>
					</div>
				</div>
			)}
		</div>
	)
}