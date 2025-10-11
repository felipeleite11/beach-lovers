import { prisma } from '@/lib/prisma'
import { Person } from '@/types/Person'
import { NextRequest } from 'next/server'
import { isBefore } from 'date-fns'

type DefinePairsData = {
	pairs: [Person, Person][]
}

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
				categories: {
					include: {
						category: true
					}
				},
				management: true
			}
		})

		if (!response) {
			throw new Error('Torneio não encontrado.')
		}

		const now = new Date()
		let status: string

		if (response.status === 'cancelled') {
			status = 'cancelado'
		} else if (isBefore(now, response.subscription_start)) {
			status = 'inscrições não iniciadas'
		} else if (isBefore(response.subscription_start, now) && isBefore(now, response.subscription_end)) {
			status = 'inscrições abertas'
		} else if (isBefore(response.subscription_end, now) && isBefore(now, response.start_date)) {
			status = 'aguardando início'
		} else if (isBefore(response.start_date, now) && isBefore(now, response.end_date)) {
			status = 'acontecendo agora'
		} else {
			status = 'encerrado'
		}

		return Response.json({
			...response,
			status
		})
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
	const { pairs }: DefinePairsData = await req.json()

	console.log(id, pairs)

	try {
		// await prisma.tournament.create({

		// })

		return Response.json({})
	} catch (error) {
		console.log(error)

		return Response.json(
			{ error: 'Erro interno do servidor' },
			{ status: 500 }
		)
	}
}