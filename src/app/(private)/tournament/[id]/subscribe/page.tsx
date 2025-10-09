'use client'

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchCategoriesByTournament, fetchTournamentById, subscribeInTournament } from "@/lib/api"
import { cn } from "@/lib/utils"
import { Tournament } from "@/types/Tournament"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Check, CheckCircle } from "lucide-react"
import { useParams } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import JSConfetti from 'js-confetti'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog"
import { queryClient } from "@/components/Providers"
import { useState } from "react"
import Link from "next/link"

const jsConfetti = new JSConfetti()

const subscriptionSchema = z
	.object({
		category: z.string().min(1, "Selecione a categoria que deseja disputar")
	})

export type SubscriptionFormInputs = z.infer<typeof subscriptionSchema>

export default function () {
	const { id } = useParams()

	const { control, handleSubmit, formState: { errors, isSubmitting, isValid }, watch } = useForm<SubscriptionFormInputs>({
		resolver: zodResolver(subscriptionSchema)
	})

	const [isSuccessMessageOpen, setIsSuccessMessageOpen] = useState(false)

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
			if(tournament) {
				await subscribeInTournament({
					...data,
					tournament: tournament.id
				})
			}
		},
		onSuccess: () => {
			toast.success('Inscrição concluída!')

			jsConfetti.addConfetti()

			queryClient.invalidateQueries({
				queryKey: ['fetch-tournament-by-id']
			})

			setIsSuccessMessageOpen(true)
		},
		onError: error => {
			toast.error(error?.message || ' Ocorreu um erro ao cadastrar o torneio.')
		}
	})

	return (
		<form
			onSubmit={handleSubmit((data: SubscriptionFormInputs) => onSubmit(data))}
			className="max-w-md flex flex-col gap-3"
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

			<p className="text-sm text-slate-600 dark:text-slate-300">Ao confirmar sua inscrição você concorda com nossos termos de uso e está ciente de que o valor da mesma será debitado do seu saldo atual.</p>

			<Button disabled={isSubmitting || !isValid} type="submit" className="cursor-pointer self-end">
				Realizar inscrição
				<Check size={16} />
			</Button>

			<Dialog open={isSuccessMessageOpen} onOpenChange={setIsSuccessMessageOpen}>
				<DialogContent
					onInteractOutside={e => e.preventDefault()}
					onEscapeKeyDown={e => e.preventDefault()}
					showCloseButton={false}
				>
					<DialogHeader>
						<DialogTitle className="flex gap-2 items-center text-emerald-600 dark:text-emerald-400">
							<CheckCircle size={18} />
							Tudo certo!
						</DialogTitle>

						<DialogDescription className="text-slate-700 dark:text-slate-300">
							Sua inscrição foi realizada com sucesso.
						</DialogDescription>

						<DialogClose asChild>
							<Button variant="outline" asChild>
								<Link href={`/tournament/${id}`}>
									Fechar
								</Link>
							</Button>
						</DialogClose>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</form>
	)
}
