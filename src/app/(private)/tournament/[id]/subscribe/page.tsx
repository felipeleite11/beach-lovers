'use client'

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchCategoriesByTournament, fetchTournamentById } from "@/lib/api"
import { cn } from "@/lib/utils"
import { Tournament } from "@/types/Tournament"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Check } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import JSConfetti from 'js-confetti'

const jsConfetti = new JSConfetti()

const subscriptionSchema = z
	.object({
		category: z.string().min(1, "Selecione a categoria que deseja disputar")
	})

export type SubscriptionFormInputs = z.infer<typeof subscriptionSchema>

export default function () {
	const router = useRouter()

	const { id } = useParams()

	const { control, handleSubmit, formState: { errors, isSubmitting, isValid }, watch } = useForm<SubscriptionFormInputs>({
		resolver: zodResolver(subscriptionSchema)
	})

	const { data: tournament } = useQuery<Tournament>({
		queryKey: ['get-tournament-by-id'],
		queryFn: async () => {
			const response = await fetchTournamentById(id as string)

			return response
		},
		staleTime: 5 * 60 * 1000
	})

	const { data: categories } = useQuery({
		queryKey: ['get-categories'],
		queryFn: async () => {
			const response = await fetchCategoriesByTournament(tournament!.id)

			return response
		},
		enabled: !!tournament
	})

	const { mutate: onSubmit } = useMutation({
		mutationFn: async (data: SubscriptionFormInputs) => {
			console.log('data', data)

			// await subscribe(data)
		},
		onSuccess: () => {
			toast.success('Inscrição concluída!')

			jsConfetti.addConfetti()

			router.push('subscribe/confirmation')
		},
		onError: error => {
			toast.error(error?.message || ' Ocorreu um erro ao cadastrar o torneio.')
		}
	})

	return (
		<form
			onSubmit={handleSubmit((data: SubscriptionFormInputs) => onSubmit(data))}
			className="max-w-md flex flex-col gap-2"
		>
			<Controller
				name="category"
				control={control}
				render={({ field }) => (
					<div className={cn('space-y-2', { hidden: !categories?.length })}>
						<Label htmlFor="category">Categoria</Label>

						<Select
							value={field.value ?? ''}
							onValueChange={field.onChange}
						>
							<SelectTrigger className="cursor-pointer w-full">
								<SelectValue placeholder="Selecione" />
							</SelectTrigger>

							<SelectContent>
								{categories?.map(category => (
									<SelectItem key={category.id} value={category.id}>
										{category.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						{errors.category && (
							<p className="text-sm text-red-500">{errors.category.message}</p>
						)}
					</div>
				)}
			/>

			<p className="text-sm text-slate-300">Ao confirmar sua inscrição você concorda com nossos termos de uso e está ciente de que o valor da mesma será debitado do seu saldo atual.</p>

			<Button disabled={isSubmitting || !isValid} type="submit" className="cursor-pointer self-end">
				Realizar inscrição
				<Check size={16} />
			</Button>
		</form>
	)
}
