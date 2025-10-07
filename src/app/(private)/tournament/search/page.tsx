'use client'

import { SearchIcon } from "lucide-react"
import { useForm, Controller } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
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
import { fetchRegions } from "@/lib/api"
import { useGeolocation } from "@/hooks/useGeolocation"
import { Map2 } from "@/components/Map2"

type SearchData = {
	region: string
}

export default function Search() {
	const { location, isFetching } = useGeolocation()

	const { data: regions } = useQuery({
		queryKey: ['get-regions'],
		queryFn: async () => {
			const response = await fetchRegions()

			return response
		}
	})

	const { handleSubmit, control, formState: { isSubmitting } } = useForm<SearchData>()

	async function onSubmit(data: SearchData) {
		console.log(data)
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

			<form onSubmit={handleSubmit((data: SearchData) => onSubmit(data))} className="max-w-sm">
				<FieldSet>
					<FieldLegend>Busca avançada</FieldLegend>

					<FieldDescription>Encontre o torneio ideal para você.</FieldDescription>

					<FieldGroup>
						<Field>
							<FieldLabel htmlFor="name">Região</FieldLabel>

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

						{isFetching ? (
							<div>Buscando posição</div>
						) : location ? (
							<Map2 
								latitude={location.latitude}
								longitude={location.longitude}
							/>
						) : null}

						<p>- por local de jogo</p>
						<p>- por sexo</p>
					</FieldGroup>
				</FieldSet>

				<Button type="submit" className="xl:my-3 cursor-pointer" disabled={isSubmitting}>
					Buscar
					<SearchIcon size={16} />
				</Button>
			</form>
		</div>
	)
}