import { prisma } from '@/lib/prisma'

export async function GET() {
	try {
		const response = await prisma.person.findMany()

		return Response.json(response)
	} catch (error) {
		return Response.json(
			{ error: 'Erro interno do servidor' },
			{ status: 500 }
		)
	}
}