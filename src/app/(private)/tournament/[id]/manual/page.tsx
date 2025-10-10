'use client'

import { useEffect, useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import { Check, ChevronsUpDown, Eraser } from "lucide-react"
import { useParams } from "next/navigation"
import { fetchTournamentById } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { Person } from "@/types/Person"
import { Tournament } from "@/types/Tournament"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from '@/lib/utils'
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
		// console.log(data)

		// const { pairs } = data

		// TODO: dividir pairs em duplas

		const players = tournament?.subscriptions.map(subs => subs.person)

		console.log('players', players)

		setPairsConfirmation([
			[
				players[0],
				players[1]
			],
			[
				players[2], 
				players[3]
			]
		])
	}

	const { data: tournament } = useQuery<Tournament>({
		queryKey: ['fetch-tournament-by-id'],
		queryFn: async () => {
			const foundTournament = await fetchTournamentById(id)

			return foundTournament
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

	const players = tournament?.subscriptions.map(subs => ({
		...subs.person,
		value: subs.person.name.toLowerCase(),
		label: subs.person.name
	}))

	const includedNames = getValues('pairs').map(item => item.name)
	const isReady = includedNames.every(Boolean)

	console.log('pairsConfirmation', pairsConfirmation)
	
	return (
		<div className="flex flex-col gap-6">
			<h1 className="font-semibold text-2xl">Defina as duplas / equipes manualmente</h1>

			<p className="text-sm">Preencha todos as vagas com os atletas correspondentes.</p>

			{players && (
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

					<Button type="submit" disabled={!isReady} className="justify-self-end col-start-2 w-full">Concluir</Button>
				</form>
			)}

			{pairsConfirmation && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-40">
					{pairsConfirmation.map((pair, idx) => (
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
	)
}