import { uploadToMinio } from "@/config/file-storage"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ slug: string }> }
) {
	const { slug } = await params

	try {
		const response = await prisma.teacher.findFirst({
			where: {
				slug
			},
			include: {
				ratings: {
					include: {
						person: true
					}
				},
				arenas: true
			}
		})

		if (!response) {
			return Response.json(
				{ error: 'Professor não encontrado' },
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
