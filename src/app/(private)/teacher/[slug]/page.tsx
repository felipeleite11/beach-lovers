'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { ArrowBigDownDash, ArrowBigUpDash, Heart, MessageCircle, OctagonX, Volleyball } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useQuery } from '@tanstack/react-query'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog"
import { Skeleton } from '@/components/ui/skeleton'
import { calculateAge, getDuration } from '@/utils/number'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { fetchTeacherBySlug } from '@/lib/api'
import { Teacher } from '@/types/Teacher'
import { cn } from '@/lib/utils'

export default function PersonProfile() {
	const { slug } = useParams<{ slug: string }>()

	const { data: teacher } = useQuery<Teacher>({
		queryKey: ['get-teacher-by-slug'],
		queryFn: async () => {
			const response = await fetchTeacherBySlug(slug)
			
			return response
		}
	})

	if (!teacher) {
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

	console.log('teacher', teacher)

	return (
		<div className="flex flex-col gap-8">
			<div className="grid grid-cols-[14rem_auto] gap-14 items-center">
				
				{/* Header */}
				<div className="relative self-start animate__animated animate__fadeIn animate__faster">
					<Avatar className="w-56 h-56 shadow-md">
						{teacher.image && <AvatarImage src={teacher.image} className="object-cover" />}
						<AvatarFallback>{teacher.name[0].toUpperCase()}</AvatarFallback>
					</Avatar>
				</div>

				{/* Right side info */}
				<div className="flex flex-col gap-8 w-full mt-20 text-sm">
					<h1 className="text-3xl font-bold animate__animated animate__fadeIn animate__faster delay-200">{teacher.name}</h1>

					<div className="flex flex-col gap-1">
						<span>Atua em: {teacher.arenas?.map(arena => arena.name).join(', ')}</span>
						<span>Contatos: {teacher.phone} {teacher.email ? ` - ${teacher.email}` : ''}</span>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-4">
				<h2 className="font-semibold text-lg">Avaliações</h2>

				<div className="h-48 w-[calc(100vw-24rem)] overflow-x-auto overflow-y-hidden flex gap-4">
					{teacher.ratings?.map((rating, idx) => (
						<div key={rating.id + idx} className={cn(
							'overflow-hidden flex flex-col gap-5 bg-slate-200 dark:bg-slate-900 rounded-md p-5 w-72 animate__animated animate__fadeInUp animate__faster',
							`delay-${idx * 100}`
						)}>
							<div className="flex gap-5">
								<Avatar className="w-14 h-14 shadow-md">
									{rating.person?.image && <AvatarImage src={rating.person.image} className="object-cover" />}
									<AvatarFallback>{rating.person?.name[0].toUpperCase()}</AvatarFallback>
								</Avatar>

								<div className="flex flex-col gap-2">
									<span className="font-semibold text-sm">{rating.person?.name}</span>

									<div className="text-orange-600 dark:text-orange-400 flex gap-1 items-baseline text-sm">
										Nota:
										<span className="font-bold text-lg">{rating.rating}</span>
									</div>
								</div>
							</div>

							<span className="text-sm line-clamp-4 text-ellipsis break-words">{rating.comment}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
