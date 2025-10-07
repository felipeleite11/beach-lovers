'use client'

import { useMutation } from "@tanstack/react-query"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { ImageIcon } from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"
import z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
	Select, 
	SelectContent, 
	SelectItem, 
	SelectTrigger, 
	SelectValue 
} from "@/components/ui/select"
import { usePerson } from "@/hooks/usePerson"
import { updatePerson } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog"
import { ACCEPTED_IMAGE_TYPES } from "@/utils/file"
import { Upload, UploadTrigger, UploadViewer } from "@/components/ui/upload"
import { authClient } from "@/lib/auth.client"
import { SpinnerImage } from "@/components/ui/spinner"

const profileSchema = z
	.object({
		name: z.string().min(1, "Informe seu nome"),
		image: z.file('Envie uma foto')
			.refine(file => file?.size <= 6 * 1024 * 1024, 'A imagem deve ter até 6MB')
			.refine(
				file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
				'Envie uma imagem em formato .png, .jpg, .jpeg ou .webp'
			),
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

	const { refetch: refetchSession } = authClient.useSession()

	const router = useRouter()

	const person = usePerson()

	const [openUpdateDialog, setOpenUpdateDialog] = useState(!!isCompletion)

	const { register, reset, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormInputs>({
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
			setTimeout(() => {
				reset({
					name: person.name || '',
					birthdate: person.birthdate ? format(new Date(person.birthdate), 'dd/MM/yyyy') : '',
					gender: person.gender || '',
					start_playing_date: person.start_playing_date ? format(new Date(person.start_playing_date), 'MM/yyyy') : ''
				})
			}, 100)
		}
	}, [person])

	const { mutate: onSubmit } = useMutation({
		mutationFn: async (data: ProfileFormInputs) => {
			if (person) {
				await updatePerson({
					slug: person.slug!,
					...data,
					gender: data.gender as 'M' | 'F'
				})
			}
		},
		onSuccess: () => {
			toast.success('Perfil atualizado!')

			refetchSession()

			router.push('/home')
		},
		onError: error => {
			toast.error(error?.message || ' Ocorreu um erro ao cadastrar o torneio.')
		}
	})

	if(!person) {
		return (
			<SpinnerImage />
		)
	}

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-xl font-semibold">Perfil</h1>

			<form 
				onSubmit={handleSubmit((data: ProfileFormInputs) => onSubmit(data))} 
				className="flex flex-col xl:grid md:grid-cols-[24rem_auto] gap-8"
			>
				<Controller
					name="image"
					control={control}
					render={({ field }) => (
						<div className="md:row-span-5 space-y-2 flex justify-center">
							<Upload 
								id="image" 
								onFileChange={field.onChange} 
								className="w-64 h-64 md:w-80 md:h-80"
								preloadedImage={person.image || undefined}
							>
								{({ id, preloadedImage }) => (
									<>
										<UploadViewer 
											file={field.value} 
											className="rounded-full w-full shadow-md" 
											preloadedImage={preloadedImage}
										/>

										<UploadTrigger 
											id={id} 
											file={field.value} 
											className="flex flex-col gap-2 rounded-full"
											preloadedImage={preloadedImage}
										>
											<ImageIcon size={28} />
											Enviar imagem
										</UploadTrigger>
									</>
								)}
							</Upload>

							{errors.image && (
								<p className="text-sm text-red-500">{errors.image.message}</p>
							)}
						</div>
					)}
				/>

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
							<Label htmlFor="gender">Sexo</Label>

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

				<Button disabled={isSubmitting} type="submit" className="xl:my-2 cursor-pointer">
					Atualizar perfil
				</Button>
			</form>

			<Dialog open={openUpdateDialog} onOpenChange={setOpenUpdateDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Atualize seu perfil</DialogTitle>

						<DialogDescription className="leading-7 mt-3">
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