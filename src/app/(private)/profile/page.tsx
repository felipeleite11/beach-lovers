'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePerson } from "@/hooks/usePerson"
import { updatePerson } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog"

const profileSchema = z
	.object({
		name: z.string().min(1, "Informe seu nome"),
		gender: z.string().refine(val => ['M', 'F'].includes(val), 'Selecione uma opção'),
		birthdate: z.string()
			.refine(val => /^\d{2}\/\d{2}\/\d{4}$/.test(val), "Use o formato dd/mm/yyyy")
			.transform(val => {
				const [d, M, y] = val.split('/')
				return `${y}-${M.padStart(2, '0')}-${d.padStart(2, '0')}`
			}),
		start_playing_date: z.string()
			.refine(val => /^\d{2}\/\d{4}$/.test(val), "Use o formato mm/yyyy")
			.transform(val => {
				const [M, y] = val.split('/')
				return `${y}-${M.padStart(2, '0')}-01`
			})
	})

export type ProfileFormInputs = z.infer<typeof profileSchema>

export default function Profile() {
	const searchParams = useSearchParams()
	const isCompletion = searchParams.get('completion')

	const person = usePerson()

	const [openUpdateDialog, setOpenUpdateDialog] = useState(!!isCompletion)

	const { register, reset, control, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<ProfileFormInputs>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: '',
			birthdate: '',
			gender: '',
			start_playing_date: ''
		}
	})

	useEffect(() => {
		if (person) {
			reset({
				name: person.name || '',
				birthdate: person.birthdate || '',
				gender: person.gender || '',
				start_playing_date: person.start_playing_date || ''
			})
		}
	}, [person, reset])

	const { mutate: onSubmit } = useMutation({
		mutationFn: async (data: ProfileFormInputs) => {
			if (person) {
				await updatePerson({
					...data as Person,
					slug: person?.slug
				})
			}
		},
		onSuccess: () => {
			toast.success('Perfil atualizado!')
		},
		onError: error => {
			toast.error(error?.message || ' Ocorreu um erro ao cadastrar o torneio.')
		}
	})

	console.log('watch', watch('gender'))

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-xl font-semibold">Perfil</h1>

			<form onSubmit={handleSubmit((data: ProfileFormInputs) => onSubmit(data))} className="flex flex-col xl:grid md:grid-cols-2 xl:grid-cols-3 gap-8">
				<div className="space-y-2">
					<Label htmlFor="name">Nome</Label>

					<Input
						id="name"
						{...register("name")}
						className="dark:bg-slate-800"
					/>

					{errors.name && (
						<p className="text-sm text-red-500">{errors.name.message}</p>
					)}
				</div>

				<div className="space-y-2">
					<Label htmlFor="birthdate">Data de nascimento</Label>

					<Input
						id="birthdate"
						{...register("birthdate")}
						className="dark:bg-slate-800"
					/>

					{errors.birthdate && (
						<p className="text-sm text-red-500">{errors.birthdate.message}</p>
					)}
				</div>

				<div className="space-y-2">
					<Label htmlFor="start_playing_date">Quando começou a jogar?</Label>

					<Input
						id="start_playing_date"
						{...register("start_playing_date")}
						className="dark:bg-slate-800"
					/>

					{errors.start_playing_date && (
						<p className="text-sm text-red-500">{errors.start_playing_date.message}</p>
					)}
				</div>

				<Controller
					name="gender"
					control={control}
					render={({ field }) => (
						<div className="space-y-2">
							<Label htmlFor="gender">Categoria</Label>

							<Select
								value={field.value ?? ''}
								onValueChange={field.onChange}
							>
								<SelectTrigger className="cursor-pointer w-full">
									<SelectValue placeholder="Selecione" />
								</SelectTrigger>

								<SelectContent>
									<SelectItem value="M">
										Masculino
									</SelectItem>
									<SelectItem value="F">
										Feminino
									</SelectItem>
								</SelectContent>
							</Select>

							{errors.gender && (
								<p className="text-sm text-red-500">{errors.gender.message}</p>
							)}
						</div>
					)}
				/>

				<Button disabled={isSubmitting} type="submit" className="xl:my-2 xl:self-end md:col-span-2 xl:col-span-3 cursor-pointer">
					Atualizar perfil
				</Button>
			</form>

			<Dialog open={openUpdateDialog} onOpenChange={setOpenUpdateDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Atualize seu perfil</DialogTitle>

						<DialogDescription>
							É essencial atualizar seu perfil antes de participar de qualquer competição. Precisamos saber sua idade e seu sexo para definir de quais competições você poderá participar.
						</DialogDescription>
					</DialogHeader>

					<DialogClose asChild>
						<Button className="cursor-pointer">
							Fechar
						</Button>
					</DialogClose>
				</DialogContent>
			</Dialog>
		</div>
	)
}