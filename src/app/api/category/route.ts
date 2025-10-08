import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url)

		const tournamentId = searchParams.get('tournament')

		const response = await prisma.category.findMany({
			where: tournamentId ? {
				tournaments: {
					some: {
						id: tournamentId
					}
				}
			} : undefined
		})

		return Response.json(response)
	} catch (error) {
		return Response.json(
			{ error: 'Erro interno do servidor' },
			{ status: 500 }
		)
	}
}