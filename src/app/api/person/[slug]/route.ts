import { prisma } from "@/lib/prisma"
import { NextRequest } from "next/server"

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ slug: string }> }
) {
	const { slug } = await params

	try {
		const response = await prisma.person.findFirst({
			where: {
				slug
			},
			include: {
				equipment: true,
				posts: {
					orderBy: { created_at: 'desc' },
					include: {
						images: true
					}
				}
			}
		})

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