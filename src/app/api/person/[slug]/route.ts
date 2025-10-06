import { uploadToMinio } from "@/config/file-storage"
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

		const formData = await req.formData()

		const name = formData.get("name") as string
		const birthdate = formData.get("birthdate") as string
		const gender = formData.get("gender") as 'M' | 'F'
		const start_playing_date = formData.get("start_playing_date") as string
		const file = formData.get("image") as File | null
		let imageLink: string

		if (file) {
			imageLink = await uploadToMinio(file)
		}

		if (!slug) {
			return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 })
		}

		const response = await prisma.$transaction(async tx => {
			const person = await tx.person.update({
				where: { slug },
				data: {
					name,
					birthdate: new Date(birthdate),
					gender,
					start_playing_date: new Date(start_playing_date),
					image: imageLink
				}
			})

			await tx.user.update({
				data: {
					image: imageLink
				},
				where: {
					id: person.userId
				}
			})

			return person
		})

		return Response.json(response)
	} catch (error) {
		return Response.json(
			{ error: 'Erro interno do servidor' },
			{ status: 500 }
		)
	}
}