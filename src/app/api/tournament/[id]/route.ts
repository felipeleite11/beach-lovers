import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params

		const response = await prisma.tournament.findUnique({
			where: {
				id
			},
			include: {
				arena: true,
				subscriptions: {
					include: {
						person: true
					}
				},
				categories: true,
				slots: true,
				management: true
			}
		})

		return Response.json(response)
	} catch (error) {
		console.log(error)
		
		return Response.json(
			{ error: 'Erro interno do servidor' },
			{ status: 500 }
		)
	}
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params
	const { pairs }: SubscriptionData = await req.json()

	console.log(id, pairs)

	try {
		// await prisma.tournament.create({

		// })

		return Response.json({})
	} catch(error) {
		console.log(error)
		
		return Response.json(
			{ error: 'Erro interno do servidor' },
			{ status: 500 }
		)
	}
}