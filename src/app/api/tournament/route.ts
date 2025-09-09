import { prisma } from '@/lib/prisma'

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