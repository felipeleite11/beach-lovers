'use client'

import { useState } from "react"
import { ArrowRight, Calendar, DollarSign, Frown, MapPin, Play, SearchIcon, Users } from "lucide-react"
import { useForm, Controller } from "react-hook-form"
import { format } from "date-fns"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Avatar,
  AvatarImage
} from "@/components/ui/avatar"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet
} from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useQuery } from "@tanstack/react-query"
import { fetchArenas, fetchRegions, searchTournaments } from "@/lib/api"
import { Tournament, TournamentSearchData } from "@/types/Tournament"
import { toast } from "sonner"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { SpinnerImage } from "@/components/ui/spinner"
import { formatCurrency } from "@/utils/number"
// import { useGeolocation } from "@/hooks/useGeolocation"
// import { TournamentSummaryForMapInfoContent } from "@/components/TournamentSummaryForMapInfoContent"
// import { Map } from "@/components/Map"

export default function Search() {
	// const { location, isFetching } = useGeolocation()

	const [tournaments, setTournaments] = useState<Tournament[] | null>(null)

	const { data: regions } = useQuery({
		queryKey: ['get-regions'],
		queryFn: async () => {
			const response = await fetchRegions()

			return response
		}
	})

	const { data: places } = useQuery({
		queryKey: ['get-arenas'],
		queryFn: async () => {
			const response = await fetchArenas()

			return response
		}
	})

	// For the Map:
	// const { data: tournaments } = useQuery({
	// 	queryKey: ['get-tournaments'],
	// 	queryFn: async () => {
	// 		const response = await fetchTournaments()

	// 		return response
	// 	}
	// })

	const { handleSubmit, control, formState: { isSubmitting } } = useForm<TournamentSearchData>()

	async function onSubmit(data: TournamentSearchData) {
		try {
			setTournaments(null)

			const response = await searchTournaments(data)

			setTournaments(response)
		} catch(e: any) {
			toast.error(e.message)
		}
	}

	return (
		<div className="flex flex-col gap-6">
			<h1 className="font-semibold text-xl">Busque um torneio</h1>

			<div className="flex w-full max-w-sm items-center gap-2">
				<Input placeholder="Nome do torneio" />

				<Button type="submit" variant="outline">
					<SearchIcon size={16} />
				</Button>
			</div>

			<form onSubmit={handleSubmit((data: TournamentSearchData) => onSubmit(data))}>
				<FieldSet>
					<FieldLegend>Busca avançada</FieldLegend>

					<FieldDescription>Encontre o torneio ideal para você.</FieldDescription>

					<FieldGroup className="flex flex-row items-end">
						<Field className="max-w-sm">
							<FieldLabel htmlFor="region">Por região</FieldLabel>

							<Controller
								name="region"
								control={control}
								render={({ field }) => (
									<Select
										value={field.value ?? ''}
										onValueChange={field.onChange}
									>
										<SelectTrigger className="cursor-pointer w-full">
											<SelectValue placeholder="Selecione" />
										</SelectTrigger>

										<SelectContent>
											{regions?.map(region => (
												<SelectItem key={region.id} value={region.id}>
													{region.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								)}
							/>
						</Field>

						<Field className="max-w-sm">
							<FieldLabel htmlFor="arena">Por arena</FieldLabel>

							<Controller
								name="arena"
								control={control}
								render={({ field }) => (
									<Select
										value={field.value ?? ''}
										onValueChange={field.onChange}
									>
										<SelectTrigger className="cursor-pointer w-full">
											<SelectValue placeholder="Selecione" />
										</SelectTrigger>

										<SelectContent>
											{places?.map(place => (
												<SelectItem key={place.id} value={place.id}>
													{place.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								)}
							/>
						</Field>

						<Field className="max-w-sm">
							<FieldLabel htmlFor="gender">Por sexo</FieldLabel>

							<Controller
								name="gender"
								control={control}
								render={({ field }) => (
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
								)}
							/>
						</Field>

						<Button type="submit" className="cursor-pointer" disabled={isSubmitting}>
							Buscar
							<SearchIcon size={16} />
						</Button>
					</FieldGroup>
				</FieldSet>
			</form>

			{isSubmitting ? (
				<SpinnerImage />
			) : tournaments?.length === 0 ? (
				<Empty>
					<EmptyHeader>
						<EmptyMedia variant="icon">
							<Frown size={24} className="text-slate-500" />
						</EmptyMedia>
					</EmptyHeader>
					<EmptyTitle>
						Poxa, não encontramos nada...
					</EmptyTitle>
					<EmptyDescription>
						Nenhum torneio corresponde ao filtro aplicado.
					</EmptyDescription>
					<EmptyContent>
						<Button asChild>
							<Link href="/tournament/create/new">
								Criar meu próprio torneio
								<ArrowRight size={16} />
							</Link>
						</Button>
					</EmptyContent>
				</Empty>
			) : !!tournaments?.length ? (
				<div className="flex flex-col gap-3 mt-4">
					{tournaments.length > 1 ? (
						<span className="font-semibold text-md">Encontramos {tournaments.length} torneios que podem lhe interessar</span>
					) : (
						<span className="font-semibold text-md">Encontramos {tournaments.length} torneio que pode lhe interessar</span>
					)}

					{tournaments.map((tournament, idx) => (
						<Item 
							key={tournament.id} 
							variant="outline" 
							className={`p-0 overflow-hidden animate__animated animate__fadeInUp animate__faster delay-${idx * 100}`}
							asChild
						>
							<Link href={`/tournament/${tournament.id}`} className="flex flex-col md:flex-row relative transition-all">
								<img src={tournament.image!} alt="" className="absolute -z-10 h-40 w-full mask-b-from-0 object-cover opacity-50" />

								{tournament.image && (
									<ItemMedia className="p-4">
										<Avatar className="size-14 lg:size-18">
											<AvatarImage src={tournament.image} className="object-cover" />
										</Avatar>
									</ItemMedia>
								)}

								<ItemContent>
									<ItemTitle className="text-lg mb-1 bg-white/70 px-2 py-1 rounded-md">{tournament.title}</ItemTitle>
									<ItemDescription className="bg-white/70 py-1 px-2 w-fit rounded-md text-xs flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-6 text-slate-500 dark:text-slate-300">
										<div className="flex items-center gap-1">
											<Calendar size={14} />
											Começa em {format(new Date(tournament.start_date), 'dd/MM/yyyy')}
										</div>
										
										<div className="flex items-center gap-1">
											<MapPin size={14} />
											<span className="max-w-[10rem] overflow-ellipsis whitespace-nowrap overflow-hidden">
												{tournament.arena?.name || null}
											</span>
										</div>

										<div className="flex items-center gap-1">
											<Users size={14} />
											<span className="max-w-[16rem] overflow-ellipsis whitespace-nowrap overflow-hidden">
												{tournament.categories.map(category => category.name).join(', ')}
											</span>
										</div>

										{tournament.price && (
											<div className="flex items-center gap-1">
												<DollarSign size={14} />
												{formatCurrency(tournament.price)}
											</div>
										)}
									</ItemDescription>
								</ItemContent>

								<ItemActions className="flex md:block w-full md:w-fit justify-center p-4">
									<Button size="sm" variant="outline">
										Ver detalhes
									</Button>
								</ItemActions>
							</Link>
						</Item>
					))}
				</div>
			) : null}

			{/* {isFetching ? (
				<div>Buscando posição</div>
			) : location && !!tournaments?.length ? (
				<div className="h-[700px] w-full rounded-md overflow-hidden">
					<Map
						center={location}
						markers={tournaments?.map((tournament, idx) => {
							const devDisplacement = (idx + 1) * 0.0025

							return {
								latitude: process.env.NEXT_PUBLIC_ENV !== 'development' ? tournament.latitude : location.latitude + devDisplacement,
								longitude: process.env.NEXT_PUBLIC_ENV !== 'development' ? tournament.longitude : location.longitude + devDisplacement,
								title: tournament.title,
								infoComponent: <TournamentSummaryForMapInfoContent tournament={tournament} />
							}
						})}
						// rangeSize={350}
					/>
				</div>
			) : null} */}
		</div>
	)
}