import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { NextRequest } from "next/server"

interface SubscriptionData {
	category: string
	tournament: string
}

export async function POST(req: NextRequest) {
	try {
		const { category, tournament }: SubscriptionData = await req.json()

		const session = await auth.api.getSession({
			headers: await headers()
		})

		const person = await prisma.person.findFirst({
			where: {
				userId: session?.user.id
			}
		})

		if (!person) {
			throw new Error('Pessoa não encontrada.')
		}

		const response = await prisma.subscription.create({
			data: {
				category_id: category,
				person_id: person.id,
				tournament_id: tournament
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
