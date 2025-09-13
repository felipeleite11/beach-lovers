'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, UploadTrigger, UploadViewer } from "@/components/ui/upload"
import { createTournament, fetchArenas, fetchCategories } from "@/lib/api"
import { extractNumbers } from "@/utils/number"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Check, Image } from "lucide-react"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import { queryClient } from "@/components/Providers"

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

const tournamentCreateSchema = z
	.object({
		title: z.string().min(1, "Informe o nome do torneio."),
		description: z.string("Informe os detalhes do torneio."),
		datetime: z.string()
			.refine(val => /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/.test(val), "Use o formato dd/mm/yyyy hh:mm")
			.transform(val => {
				const [date, time] = val.split(' ')
				const [d, M, y] = date.split('/')
				const [h, m] = time.split(':')
				return `${y}-${M.padStart(2, '0')}-${d.padStart(2, '0')} ${h.padStart(2, '0')}:${m.padStart(2, '0')}:00`
			}),
		arena_id: z.string(),
		price: z.string()
			.refine(
				val => /^R\$\s?\d{1,3}(\.\d{3})*,\d{2}$/.test(val),
				"Formato inválido"
			)
			.transform(val => {
				return extractNumbers(val)
			}),
		subscription_start: z.string()
			.refine(val => /^\d{2}\/\d{2}\/\d{4}$/.test(val), "Use o formato dd/mm/yyyy")
			.transform(val => {
				const [d, m, y] = val.split('/')
				return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`
			}),
		subscription_end: z.string()
			.refine(val => /^\d{2}\/\d{2}\/\d{4}$/.test(val), "Use o formato dd/mm/yyyy")
			.transform(val => {
				const [d, m, y] = val.split('/')
				return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`
			}),
		image: z.any()
			.refine(val => val instanceof File, 'Anexe uma imagem')
			.refine(file => file?.size <= 6 * 1024 * 1024, 'A imagem deve ter até 6MB')
			.refine(
				file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
				'Envie uma imagem em formato .png, .jpg, .jpeg ou .webp'
			),
		categories: z.array(z.string())
			.refine(value => value.some(item => item), {
				message: 'Selecione pelo menos uma categoria.'
			})
	})

export type TournamentCreateFormInputs = z.infer<typeof tournamentCreateSchema>

export default function Create() {
	const router = useRouter()

	const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<TournamentCreateFormInputs>({
		resolver: zodResolver(tournamentCreateSchema),
		defaultValues: {
			title: 'IV Torneio Afluar Veteranos',
			description: 'Vem participar!',
			price: 'R$ 10,00',
			subscription_start: '11/09/2025',
			subscription_end: '29/09/2025',
			datetime: '30/09/2025 16:00',
			arena_id: '1',
			categories: []
		}
	})

	const { data: arenas } = useQuery({
		queryKey: ['get-arenas'],
		queryFn: async () => {
			const response = await fetchArenas()

			return response
		}
	})

	const { data: categories } = useQuery({
		queryKey: ['get-categories'],
		queryFn: async () => {
			const response = await fetchCategories()

			return response
		}
	})

	const { mutate: onSubmit } = useMutation({
		mutationFn: (data: TournamentCreateFormInputs) => createTournament(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['get-last-tournaments']
			})

			toast.success('Torneio cadastrado com sucesso!')

			router.replace('/home')
		},
		onError: error => {
			toast.error(error?.message || ' Ocorreu um erro ao cadastrar o torneio.')
		}
	})

	return (
		<div className="flex flex-col gap-6">
			<h1 className="font-semibold text-xl">Novo torneio</h1>

			<form onSubmit={handleSubmit((data: TournamentCreateFormInputs) => onSubmit(data))} className="flex flex-col xl:grid xl:grid-cols-[1.4fr_2fr] gap-8">
				<Controller
					name="image"
					control={control}
					render={({ field }) => (
						<div className="space-y-2">
							<Upload id="image" onFileChange={field.onChange} acceptedFormats={ACCEPTED_IMAGE_TYPES}>
								{({ id }) => (
									<>
										<UploadViewer file={field.value} />

										<UploadTrigger id={id} file={field.value} className="flex flex-col gap-2">
											<Image size={28} />
											Enviar imagem
										</UploadTrigger>
									</>
								)}
							</Upload>

							{errors.image && (
								<p className="text-sm text-red-500">{errors.image.message as any}</p>
							)}
						</div>
					)}
				/>

				<div className="flex flex-col gap-4">
					<div className="space-y-2">
						<Label htmlFor="title">Nome do torneio</Label>

						<Input
							id="title"
							{...register("title")}
							className="dark:bg-slate-800"
						/>

						{errors.title && (
							<p className="text-sm text-red-500">{errors.title.message}</p>
						)}
					</div>

					<Controller
						name="arena_id"
						control={control}
						render={({ field }) => (
							<div className="space-y-2">
								<Label htmlFor="arena">Local</Label>

								<Select
									value={field.value}
									onValueChange={field.onChange}
								>
									<SelectTrigger className="w-80 cursor-pointer">
										<SelectValue placeholder="Selecione" />
									</SelectTrigger>

									{arenas && (
										<SelectContent>
											{arenas.map(arena => (
												<SelectItem key={arena.id} value={arena.id}>
													{arena.name}
												</SelectItem>
											))}
										</SelectContent>
									)}
								</Select>
							</div>
						)}
					/>

					<div className="space-y-2">
						<Label htmlFor="description">Detalhes</Label>

						<Textarea
							id="description"
							{...register("description")}
							className="dark:bg-slate-800 h-24"
						/>

						{errors.description && (
							<p className="text-sm text-red-500">{errors.description.message}</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="date">Data do torneio</Label>

						<Input
							id="datetime"
							{...register("datetime")}
							className="dark:bg-slate-800"
						/>

						{errors.datetime && (
							<p className="text-sm text-red-500">{errors.datetime.message}</p>
						)}
					</div>

					<div className="flex gap-4">
						<div className="space-y-2 w-full">
							<Label htmlFor="subscription_start">Início das inscrições</Label>

							<Input
								id="subscription_start"
								{...register("subscription_start")}
								className="dark:bg-slate-800"
							/>

							{errors.subscription_start && (
								<p className="text-sm text-red-500">{errors.subscription_start.message}</p>
							)}
						</div>

						<div className="space-y-2 w-full">
							<Label htmlFor="subscription_end">Fim das inscrições</Label>

							<Input
								id="subscription_end"
								{...register("subscription_end")}
								className="dark:bg-slate-800"
							/>

							{errors.subscription_end && (
								<p className="text-sm text-red-500">{errors.subscription_end.message}</p>
							)}
						</div>

						<div className="space-y-2 w-full">
							<Label htmlFor="price">Valor da inscrição</Label>

							<Input
								id="price"
								{...register("price")}
								className="dark:bg-slate-800"
							/>

							{errors.price && (
								<p className="text-sm text-red-500">{errors.price.message}</p>
							)}
						</div>

						<div>
							<Checkbox id="" />
						</div>
					</div>

					{categories && (
						<div className="space-y-4">
							<Label htmlFor="category">Categorias</Label>

							<div className="flex flex-col xl:grid xl:grid-cols-3 gap-3">
								{categories?.map(category => (
									<Controller
										key={category.id}
										name="categories"
										control={control}
										render={({ field }) => {
											const isChecked = field.value.includes(category.id)

											return (
												<div className="flex items-center space-x-2 text-sm">
													<Checkbox
														checked={isChecked}
														onCheckedChange={(checked) => {
															const newValue = checked
																? [...field.value, category.id]
																: field.value.filter((val) => val !== category.id)
															field.onChange(newValue)
														}}
													/>
													<label>{category.name}</label>
												</div>
											)
										}}
									/>
								))}
							</div>

							{errors.categories && (
								<p className="text-sm text-red-500">{errors.categories.message}</p>
							)}
						</div>
					)}

					<Button type="submit" disabled={isSubmitting}>
						Cadastrar torneio
						<Check size={16} />
					</Button>
				</div>
			</form>
		</div>
	)
}