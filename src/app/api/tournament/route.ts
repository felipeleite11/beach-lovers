import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'
import { headers } from 'next/headers'
import { isAfter } from 'date-fns'

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
		const body = await req.json()

		const {
			title,
			description,
			datetime,
			arena_id,
			price,
			subscription_start,
			subscription_end
		} = body

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
		return Response.json(
			{ error: error.message || 'Erro interno do servidor' },
			{ status: 500 }
		)
	}
}