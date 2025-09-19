'use client'

import React from 'react'
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Post } from '@/types/Post';

const posts: Post[] = [
	{
		id: '1',
		author: {
			id: '2',
			name: 'Larissa Carvalho',
			image: '/images/girl.png',
			slug: 'larissa-carvalho',
			gender: 'F',
			category: 'iniciante'
		},
		description: 'Hoje o play foi até meia-noite!',
		created_at: '15/08/2025 10:50',
		images: [
			{
				id: '3',
				url: '/images/play.jpg'
			}
		],
		likes: [
			{
				id: '1',
				person: {
					id: '3',
					name: 'Yuri Rego',
					image: '/images/boy.jpg'
				}
			},
			{
				id: '2',
				person: {
					id: '1',
					name: 'Felipe Leite',
					image: '/images/boy.jpg'
				}
			}
		],
		comments: [
			{
				id: '1',
				person: {
					id: '1',
					name: 'Felipe Leite',
					image: '/images/boy.jpg'
				},
				content: 'Foi top demais!',
				created_at: '17/08/2025 10:50'
			},
			{
				id: '2',
				person: {
					id: '2',
					name: 'Larissa Carvalho',
					image: '/images/girl.png'
				},
				content: 'Pena que acabou cedo pra mim... =(',
				created_at: '24/08/2025 12:12'
			}
		]
	},

	{
		id: '2',
		author: {
			id: '3',
			name: 'Yuri Rego',
			image: '/images/boy.jpg',
			gender: 'M',
			slug: 'yuri-rego'
		},
		description: 'Raquete nova S2',
		created_at: '22/08/2025 10:50',
		images: [
			{
				id: '1',
				url: '/images/raquete.jpg'
			},
			{
				id: '2',
				url: '/images/raquete2.png'
			}
		],
		likes: [],
		comments: []
	}
]

export default function Timeline() {
	return (
		<ul className="w-full divide-y divide-gray-200/80 xl:border-l-4 xl:border-l-slate-200 xl:dark:border-l-slate-700 xl:px-16 overflow-y-auto scrollbar-transparent">
			{posts.map(post => (
				<li key={post.id} className="flex flex-col gap-4 py-6">
					<div className="flex gap-4 justify-between items-center">
						<div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
							<Avatar>
								{post.author.image && <AvatarImage src={post.author.image} className="object-cover" />}
								<AvatarFallback>{post.author.name[0].toUpperCase()}</AvatarFallback>
							</Avatar>

							<span className="font-semibold">{post.author.name}</span>
						</div>

						<span className="text-xs text-slate-400">{post.created_at}</span>
					</div>

					{Array.isArray(post.images) && post.images.length > 1 ? (
						<Carousel>
							<CarouselContent>
								{post.images.map(item => (
									<CarouselItem key={item.id}>
										<Image alt="" width={1000} height={800} src={item.url} className="w-full xl:w-[29vw] xl:h-[29vw] object-cover rounded-sm" />
									</CarouselItem>
								))}
							</CarouselContent>

							<CarouselPrevious className="cursor-pointer" />
							<CarouselNext className="cursor-pointer" />
						</Carousel>
					) : (
						<Image alt="" width={1000} height={800} src={String(post.images[0].url)} className="w-full xl:w-[29vw] xl:h-[29vw] object-cover rounded-sm" />
					)}

					<div>
						{post.description}
					</div>

					<div className="px-1 flex gap-3 items-center">
						<Heart size={20} className="cursor-pointer hover:opacity-70" onClick={() => { }} />

						<MessageCircle size={20} className="cursor-pointer hover:opacity-70" onClick={() => { }} />
					</div>
				</li>
			))}
		</ul>
	)
}
