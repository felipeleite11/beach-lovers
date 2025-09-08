'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { ArrowBigDownDash, ArrowBigUpDash, Heart, Medal, MessageCircle, OctagonX, Volleyball } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { people } from '@/storage'
import { useQuery } from '@tanstack/react-query'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog"
import { useState } from 'react'

export default function () {
	const { id } = useParams()

	const [openImage, setOpenImage] = useState<Post | null>(null)

	const { data } = useQuery({
		queryKey: ['get-person-by-id'],
		queryFn: async () => {
			const person = people.find(person => person.id === +id!)

			return person
		}
	})

	if (!data) {
		return null
	}

	return (
		<div className="flex flex-col gap-2">
			<div className="grid grid-cols-[14rem_auto] gap-14 items-center">
				<div className="relative self-start">
					<Avatar className="w-56 h-56 shadow-md">
						<AvatarImage src={data.image} className="object-cover" />
						<AvatarFallback>{data.name[0].toUpperCase()}</AvatarFallback>
					</Avatar>

					{data.equipment && (
						<Tooltip>
							<TooltipTrigger asChild>
								<Avatar
									className="w-24 h-24 absolute -bottom-6 left-36 shadow-lg hover:w-28 hover:h-28 transition-all cursor-pointer"
									onClick={() => {
										window.open(`https://www.google.com/search?q=${data.equipment!.name}`, '_blank')
									}}
								>
									<AvatarImage src={data.equipment.image} className="object-cover" />
								</Avatar>
							</TooltipTrigger>

							<TooltipContent side="bottom">
								{data.equipment.name}
							</TooltipContent>
						</Tooltip>
					)}
				</div>

				<div className="grid grid-cols-[auto_14rem] 2xl:grid-cols-[auto_20rem] gap-8 w-full mt-20">
					<div className="flex flex-col gap-6">
						<h1 className="text-3xl font-bold">{data.name}</h1>

						<div className="flex flex-col gap-2">
							<span className="text-sm">35 anos - 6 meses no beach tennis</span>
							<span className="text-sm">Masculino - Categoria D</span>
						</div>
					</div>

					<div className="flex flex-col gap-3 border-l-2 border-l-slate-700 pl-8 py-4 text-sm">
						<span className="flex items-center gap-2">
							<Medal size={17} />
							Rank geral: #{data.id}
						</span>

						<span className="flex items-center gap-2">
							<Volleyball size={17} />
							32 jogos
						</span>

						<span className="flex items-center gap-2">
							<ArrowBigUpDash size={17} />
							24 vitórias
						</span>

						<span className="flex items-center gap-2">
							<ArrowBigDownDash size={17} />
							7 derrotas
						</span>

						<span className="flex items-center gap-2">
							<OctagonX size={17} />
							1 W.O.
						</span>
					</div>
				</div>

				<div className="flex flex-wrap gap-6 col-span-2">
					{data.images?.map((image, idx) => {
						const imageToShow = Array.isArray(image.url) ? image.url[0] : image.url

						return (
							<Dialog key={image.id}>
								<DialogTrigger asChild className={`animate__animated animate__fadeInUp delay-${idx * 100}`}>
									<div
										className="group w-48 flex flex-col gap-4 cursor-pointer relative"
										onClick={() => {
											setOpenImage(image)
										}}
									>
										<Image
											src={imageToShow}
											alt={image.content}
											width={400}
											height={400}
											className="object-cover w-48 h-48 rounded-sm group-hover:scale-105 transition-all saturate-50 group-hover:saturate-100"
										/>

										<span className="w-full text-sm hidden group-hover:block animate__animated animate__fadeIn animate__faster absolute bottom-0 bg-black/70 p-2 rounded-md">
											{image.content}
										</span>
									</div>
								</DialogTrigger>

								<DialogContent>
									<DialogHeader>
										<DialogTitle />
									</DialogHeader>

									<Image 
										src={Array.isArray(openImage?.url) ? openImage?.url[0] : openImage?.url!} 
										width={1000} 
										height={1000} 
										className="max-h-[28rem] w-full h-full object-contain rounded-sm" alt="" 
									/>

									<div className="px-1 flex gap-3 items-center">
										<Heart size={20} className="cursor-pointer hover:opacity-70" onClick={() => { }} />

										<MessageCircle size={20} className="cursor-pointer hover:opacity-70" onClick={() => { }} />
									</div>

									<DialogDescription className="h-16 overflow-y-auto text-slate-700 dark:text-slate-200">
										{openImage?.content}
									</DialogDescription>
								</DialogContent>
							</Dialog>
						)
					})}
				</div>
			</div>
		</div>
	)
}
