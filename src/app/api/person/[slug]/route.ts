import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

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
				},
				user: true
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

export async function PUT(
	req: NextRequest, 
	{ params }: { params: Promise<{ slug: string }> }
) {
	try {
		const { slug } = await params
		const body = await req.json()

		const { name, birthdate, gender } = body

		if (!slug) {
			return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 })
		}

		const response = await prisma.person.update({
			where: { slug },
			data: {
				...(name && { name }),
				...(birthdate && { birthdate }),
				...(gender && { gender })
			}
		})

		console.log('response', response)

		return Response.json(response)
	} catch (error) {
		console.log(error)

		return Response.json(
			{ error: 'Erro interno do servidor' },
			{ status: 500 }
		)
	}
}