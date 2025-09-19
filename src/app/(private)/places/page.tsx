'use client'

import { useEffect, useState } from "react"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
// import LeafletMap from "@/components/Map"
import Image from "next/image"
import { CalendarCheck, Clock, Heart, Map, MessageCircle, Phone } from "lucide-react"

import 'leaflet/dist/leaflet.css'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { fetchArenasByRegion, fetchRegions } from "@/lib/api"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function Places() {
	const [selectedRegionId, setSelectedRegionId] = useState('1')
	const [selectedArenaId, setSelectedArenaId] = useState('')

	const { data: regions } = useQuery({
		queryKey: ['get-regions'],
		queryFn: async () => {
			const response = await fetchRegions()

			return response
		}
	})

	const { data: arenas, refetch: refetchArenas } = useQuery({
		queryKey: ['get-arenas-by-region'],
		queryFn: async () => {
			const response = await fetchArenasByRegion(selectedRegionId)

			return response
		},
		enabled: !!selectedRegionId
	})

	useEffect(() => {
		if(selectedRegionId) {
			refetchArenas()
		}
	}, [selectedRegionId])

	if(!regions) {
		return null
	}
	
	const selectedArena = arenas?.find(arena => arena.id === selectedArenaId)

	return (
		<div className="flex flex-col gap-6">
			<h1 className="font-semibold text-3xl border-b border-b-slate-200 dark:border-b-slate-600 pb-6">Quadras e Arenas</h1>

			<div className="text-sm flex items-center gap-2">
				<span>Região:</span>

				<Select value={selectedRegionId || ''} onValueChange={setSelectedRegionId}>
					<SelectTrigger className="w-80 cursor-pointer">
						<SelectValue placeholder="Selecione" />
					</SelectTrigger>

					<SelectContent>
						{regions.map(region => (
							<SelectItem key={region.id} value={region.id}>
								{region.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="text-sm flex items-center gap-2">
				<span>Arena:</span>

				{selectedRegionId && (
					<>
						{!!arenas?.length ? (
							<Select value={selectedArenaId || ''} onValueChange={setSelectedArenaId}>
								<SelectTrigger className="w-80 cursor-pointer">
									<SelectValue placeholder="Selecione" />
								</SelectTrigger>

								<SelectContent>
									{arenas.map(arena => (
										<SelectItem key={arena.id} value={String(arena.id)}>
											{arena.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						) : (
							<span className="italic text-slate-400 text-sm">Nenhuma arena cadastrada nesta região</span>
						)}
					</>
				)}
			</div>

			<ArenaContainer arena={selectedArena} />
		</div>
	)
}

function ArenaContainer({ arena }: { arena?: Arena }) {
	if (!arena) {
		return null
	}

	return (
		<div className="flex flex-col gap-4 text-sm mt-4 pb-8 mr-8">
			<h2 className="text-xl font-semibold">{arena.name}</h2>

			<div className="flex gap-12">
				<div className="flex flex-col gap-4 mt-4">
					{arena.address && (
						<div className="flex items-center gap-1">
							<Map size={16} />
							Endereço: {arena.address}
						</div>
					)}

					{arena.contacts && (
						<div className="flex items-center gap-1">
							<Phone size={16} />
							Contatos: {arena.contacts}
						</div>
					)}

					{arena.business_time && (
						<div className="flex items-center gap-1">
							<Clock size={16} />
							Horário de funcionamento: {arena.business_time}
						</div>
					)}

					{arena.day_use && (
						<div className="flex items-center gap-1">
							<CalendarCheck size={16} />
							Day use: {arena.day_use}
						</div>
					)}
				</div>
			</div>

			<div className="flex flex-col gap-4">
				<h3 className="text-lg font-semibold mt-2">Fotos</h3>

				{!!arena.gallery?.length ? (
					<section className="xl:columns-[4] lg:columns-[3] gap-6 w-fit">
						{arena.gallery.map((image, idx) => (
							<>
								<Dialog key={image.id}>
									<DialogTrigger asChild className={`animate__animated animate__fadeInUp delay-${idx * 100}`}>
										<div key={image.url} className="flex flex-col gap-2 group relative cursor-pointer mb-6">
											<Image src={image.url} alt="" width={300} height={300} className="w-64 rounded-md shadow-md group-hover:opacity-40 transition-opacity" />
											
											{image.description && <span className="hidden group-hover:block font-medium absolute top-6 left-6 line-clamp-6">{image.description}</span>}
										</div>
									</DialogTrigger>

									<DialogContent>
										<DialogHeader>
											<DialogTitle />
										</DialogHeader>

										<Image 
											src={image.url}
											width={1000} 
											height={1000} 
											className="max-h-[28rem] w-full h-full object-contain rounded-sm" alt="" 
										/>

										<div className="px-1 flex gap-3 items-center">
											<Heart size={20} className="cursor-pointer hover:opacity-70" onClick={() => { }} />

											<MessageCircle size={20} className="cursor-pointer hover:opacity-70" onClick={() => { }} />
										</div>

										<DialogDescription className="h-16 overflow-y-auto text-slate-700 dark:text-slate-200">
											{image.description}
										</DialogDescription>
									</DialogContent>
								</Dialog>
							</>
						))}
					</section>
				) : (
					<span className="text-sm italic text-slate-400">Nenhuma foto cadastrada</span>
				)}
			</div>

			<div className="flex flex-col gap-4">
				<h3 className="text-lg font-semibold mt-2">Localização</h3>
			
				{/* <LeafletMap
					lat={-1.3710349016107874}
					lng={-48.44330618579579}
					marker_message="Vem pra DBeach!"
				/> */}

				<a href="https://maps.app.goo.gl/BjYqcCu8fwHDG6ia8" target="_blank" className="text-sky-500 hover:text-sky-600">Como chegar?</a>
			</div>

			<div className="flex flex-col gap-6">
				<h3 className="text-lg font-semibold mt-2">Torneios</h3>

				<div className="flex flex-col xl:grid xl:grid-cols-2 gap-8 w-fit">
					{arena.tournaments?.map(tournament => (
						<div key={tournament.id} className="flex items-center gap-4 cursor-pointer bg-slate-100/10 hover:bg-slate-100/5 transition-all w-[29rem] 2xl:w-[33rem] pr-8 rounded-md overflow-hidden">
							<Image src={tournament.image!} alt="" width={500} height={500} className="object-contain h-36 w-fit" />

							<div className="flex flex-col gap-2 leading-loose">
								<span className="font-semibold text-lg">{tournament.title}</span>

								<span className="text-sm">Vagas: {tournament.offered_subscriptions}</span>

								{tournament.categories && <span className="text-sm">Categorias: {tournament.categories.map(category => category.name).join(', ')}</span>}
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="flex flex-col gap-6">
				<h3 className="text-lg font-semibold mt-2">Professores</h3>

				{!!arena.teachers.length ? (
					<ul className="flex gap-12 flex-wrap">
						{arena.teachers?.map(teacher => (
							<li key={teacher.id} className="flex flex-col justify-center gap-3">
								<Link href={`/teacher/${teacher.slug}`}>
									<Avatar className="w-24 h-24">
										{teacher.image && <AvatarImage src={teacher.image} className="object-cover w-full" /> }
										<AvatarFallback>{teacher.name[0].toUpperCase()}</AvatarFallback>
									</Avatar>

									<span className="font-semibold">{teacher.name}</span>
								</Link>
							</li>
						))}
					</ul>
				) : (
					<span className="text-sm italic text-slate-400">Nenhum professor cadastrado</span>
				)}
			</div>
		</div>
	)
}