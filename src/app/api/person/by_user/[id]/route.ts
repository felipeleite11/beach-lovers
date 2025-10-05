import { prisma } from "@/lib/prisma"
import { NextRequest } from "next/server"

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params

	try {
		// TODO: Esta query está com erro
		const response = await prisma.person.findUnique({
			where: {
				userId: id
			}
		})

		console.log('person found', id, response)

		if (!response) {
			return Response.json(
				{ error: 'Pessoa não encontrada' },
				{ status: 404 }
			)
		}

		return Response.json(response)
	} catch (error) {
		return Response.json(
			{ error: 'Erro interno do servidor' },
			{ status: 500 }
		)
	}
}