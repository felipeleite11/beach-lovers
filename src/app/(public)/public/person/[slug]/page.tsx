'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { ArrowBigDownDash, ArrowBigUpDash, Heart, Medal, MessageCircle, OctagonX, Volleyball } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useQuery } from '@tanstack/react-query'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog"
import { Skeleton } from '@/components/ui/skeleton'
import { fetchPerson } from '@/lib/api'
import { calculateAge, getDuration } from '@/utils/number'

export default function () {
	const { slug } = useParams()

	const [openImage, setOpenImage] = useState<Post | null>(null)

	const { data } = useQuery({
		queryKey: ['get-person-by-slug', slug],
		queryFn: async () => {
			const response = await fetchPerson(slug as string)

			return response
		},
    	enabled: !!slug,
    	staleTime: 5 * 60 * 1000
	})

	if (!data) {
		return (
			<div className="grid grid-cols-[14rem_auto] gap-14">
				<Skeleton className="w-56 h-56 rounded-full" />

				<div className="flex flex-col gap-3 mt-20">
					<Skeleton className="h-11 w-80 rounded-lg" />
				</div>

				<div className="col-span-2 flex flex-wrap gap-1">
					<Skeleton className="w-48 h-48 rounded-sm" />
					<Skeleton className="w-48 h-48 rounded-sm" />
					<Skeleton className="w-48 h-48 rounded-sm" />
					<Skeleton className="w-48 h-48 rounded-sm" />
					<Skeleton className="w-48 h-48 rounded-sm" />
					<Skeleton className="w-48 h-48 rounded-sm" />
					<Skeleton className="w-48 h-48 rounded-sm" />
				</div>
			</div>
		)
	}

	const age = data.birthdate ? calculateAge(new Date(data.birthdate)) : ''
	const careerTime = data.start_playing_date ? `- ${getDuration(new Date(data.start_playing_date))} no beach tennis` : ''
	const gender = data.gender === 'M' ? 'Masculino' : data.gender === 'F' ? 'Feminino' : ''
	const category = data.category ? `- Categoria ${data.category}` : ''

	return (
		<div className="flex flex-col gap-2 p-12">
			<div className="grid grid-cols-[14rem_auto] gap-14 items-center">
				
				{/* Header */}
				<div className="relative self-start animate__animated animate__fadeIn animate__faster">
					<Avatar className="w-56 h-56 shadow-md">
						{data.image && <AvatarImage src={data.image} className="object-cover" />}
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
									<AvatarImage src={data.equipment.url} className="object-cover" />
								</Avatar>
							</TooltipTrigger>

							<TooltipContent side="bottom">
								{data.equipment.name}
							</TooltipContent>
						</Tooltip>
					)}
				</div>

				{/* Right side info */}
				<div className="grid grid-cols-[auto_14rem] 2xl:grid-cols-[auto_20rem] gap-8 w-full mt-20">
					<div className="flex flex-col gap-6 animate__animated animate__fadeIn animate__faster delay-200">
						<h1 className="text-3xl font-bold">{data.name}</h1>

						<div className="flex flex-col gap-2">
							<span className="text-sm">{age} {careerTime}</span>
							<span className="text-sm">{gender} {category}</span>
						</div>
					</div>

					<div className="flex flex-col gap-3 border-l-2 border-l-slate-700 pl-8 py-4 text-sm animate__animated animate__fadeIn animate__faster delay-400">
						<span className="flex items-center gap-2 text-red-500">
							<Medal size={17} />
							Rank geral: #1
						</span>

						<span className="flex items-center gap-2">
							<Volleyball size={17} />
							{data.wins + data.defeats + data.wos} jogo(s)
						</span>

						<span className="flex items-center gap-2">
							<ArrowBigUpDash size={17} />
							{data.wins} vitória(s)
						</span>

						<span className="flex items-center gap-2">
							<ArrowBigDownDash size={17} />
							{data.defeats} derrota(s)
						</span>

						<span className="flex items-center gap-2">
							<OctagonX size={17} />
							{data.wos} W.O.
						</span>
					</div>
				</div>

				{/* Gallery */}
				<div className="flex flex-wrap gap-1 col-span-2">
					{data.posts?.map((post, idx) => {
						const imageToShow = post.images[0].url

						return (
							<Dialog key={post.id}>
								<DialogTrigger asChild className={`animate__animated animate__fadeInUp delay-${idx * 100}`}>
									<div
										className="group w-48 flex flex-col gap-4 cursor-pointer relative"
										onClick={() => {
											setOpenImage(post)
										}}
									>
										<Image
											src={imageToShow}
											alt={post.description}
											width={400}
											height={400}
											className="object-cover w-48 h-48 rounded-sm group-hover:scale-105 transition-all saturate-50 group-hover:saturate-100"
										/>

										<span className="w-full text-sm hidden group-hover:block animate__animated animate__fadeIn animate__faster absolute bottom-0 text-white bg-black/70 p-2 rounded-md">
											{post.description}
										</span>
									</div>
								</DialogTrigger>

								<DialogContent>
									<DialogHeader>
										<DialogTitle />
									</DialogHeader>

									<Image 
										src={openImage?.images[0].url!} 
										width={1000} 
										height={1000} 
										className="max-h-[28rem] w-full h-full object-contain rounded-sm" alt="" 
									/>

									<div className="px-1 flex gap-3 items-center">
										<Heart size={20} className="cursor-pointer hover:opacity-70" onClick={() => { }} />

										<MessageCircle size={20} className="cursor-pointer hover:opacity-70" onClick={() => { }} />
									</div>

									<DialogDescription className="h-16 overflow-y-auto text-slate-700 dark:text-slate-200">
										{openImage?.description}
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
