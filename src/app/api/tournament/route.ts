import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'
import { headers } from 'next/headers'
import { isAfter } from 'date-fns'
import { uploadToMinio } from '@/config/file-storage'

export async function GET() {
	try {
		const response = await prisma.tournament.findMany({
			include: {
				arena: true,
				subscriptions: {
					include: {
						person: true
					}
				},
				categories: true,
				slots: true
			},
			orderBy: {
				created_at: 'desc'
			}
		})

		return Response.json(response)
	} catch (error) {
		return Response.json(
			{ error: 'Erro interno do servidor' },
			{ status: 500 }
		)
	}
}

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData()

		const title = formData.get("title") as string
		const description = formData.get("description") as string
		const datetime = formData.get("datetime") as string
		const arena_id = formData.get("arena_id") as string
		const subscription_start = formData.get("subscription_start") as string
		const subscription_end = formData.get("subscription_end") as string
		const price = formData.get("price") as string
		const file = formData.get("image") as File
		let imageLink

		if (file) {
			imageLink = await uploadToMinio(file)
		}

		const session = await auth.api.getSession({
			headers: await headers()
		})

		const person = await prisma.person.findFirst({
			where: {
				userId: session?.user.id
			}
		})

		if(!person) {
			throw new Error('Pessoa não encontrada.')
		}

		const isSubscriptionsStarted = isAfter(new Date(), new Date(subscription_start))
		
		const response = await prisma.tournament.create({
			data: {
				title,
				description,
				date: new Date(datetime),
				arena_id,
				image: imageLink,
				price: +price,
				subscription_start: new Date(subscription_start),
				subscription_end: new Date(subscription_end),
				status: isSubscriptionsStarted ? 'available_subscription' : 'created',
				management: {
					connect: {
						id: person.id
					}
				}
			}
		})

		return Response.json(response)
	} catch (error: any) {
		console.log(error)

		return Response.json(
			{ error: error.message || 'Erro interno do servidor' },
			{ status: 500 }
		)
	}
}