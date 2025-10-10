'use client'

import { useEffect } from 'react'
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

type FormValues = {
	pairs: Person[]
}

export default function Manual() {
	const { id } = useParams<{ id: string }>()

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
		console.log(data)
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

	const participants = tournament?.subscriptions.map(subs => ({
		value: subs.person.name.toLowerCase(),
		label: subs.person.name
	}))

	const includedNames = getValues('pairs').map(item => item.name)
	const isReady = includedNames.every(Boolean)

	return (
		<div className="flex flex-col gap-6">
			<h1 className="font-semibold text-2xl">Defina as duplas / equipes manualmente</h1>

			<p className="text-sm">Preencha todos as vagas com os atletas correspondentes.</p>

			{participants && (
				<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 w-[36rem] items-end">
					{fields.map((field, index) => {
						const currentValue = getValues(`pairs.${index}.name`)
						const hasTitle = index % 2 === 0

						return (
							<div className="flex flex-col gap-2">
								{hasTitle && (
									<span className="font-semibold text-md col-span-2">
										<h2>
											Dupla {index / 2 + 1}
										</h2>
									</span>
								)}

								<div key={field.id} className="grid grid-cols-[14rem_1rem] gap-2">
									{/* Necessário para funcionarem os selects */}
									<span className="hidden">{watch(`pairs.${index}.name`)}</span>

									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												role="combobox"
												aria-expanded={open}
												className="w-56 justify-between self-end"
											>
												{currentValue ? 
													participants.find(participant => participant.value === currentValue.toLowerCase())?.label : 
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
														{participants.map(participant => (
															<CommandItem
																key={participant.value}
																value={participant.value}
																onSelect={value => {
																	setValue(`pairs.${index}.name`, value)
																}}
																disabled={includedNames.includes(participant.value)}
															>
																{participant.label}

																<Check
																	className={cn(
																		"ml-auto",
																		currentValue === participant.value ? "opacity-100" : "opacity-0"
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
											className="ml-0"
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
		</div>
	)
}