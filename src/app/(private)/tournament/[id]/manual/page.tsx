'use client'

import { useEffect, useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import { Check, ChevronsUpDown } from "lucide-react"
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

	console.log('participants', participants)
	console.log(watch(`pairs.${3}.name`))

	return (
		<div className="flex flex-col gap-6">
			<h1 className="font-semibold text-2xl">Defina as duplas / equipes manualmente</h1>

			<p className="text-sm">Preencha todos as vagas com os atletas correspondentes.</p>

			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
				{fields.map((field, index) => {
					const currentValue = getValues(`pairs.${index}.name`)

					return (
						<div key={field.id} className="grid grid-cols-2 items-center">
							{participants && (
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											role="combobox"
											aria-expanded={open}
											className="w-[200px] justify-between"
										>
											{currentValue ? 
												participants.find(participant => participant.value === currentValue.toLowerCase())?.label : 
												'Selecione...'}
											<ChevronsUpDown className="opacity-50" />
										</Button>
									</PopoverTrigger>

									<PopoverContent className="w-[200px] p-0">
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
							)}
						</div>
					)
				})}

				<Button type="submit">Concluir</Button>
			</form>
		</div>
	)
}