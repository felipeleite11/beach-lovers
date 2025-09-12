import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
	try {
		console.log('put cALL')
	
		const id = params.id
		const body = await req.json()

    	const { name, birthdate, gender } = body

		if (!id) {
			return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 })
		}

		const response = await prisma.person.update({
			where: { id },
			data: {
				...(name && { name }),
				...(birthdate && { birthdate }),
				...(gender && { gender })
			}
		})

		return Response.json(response)
	} catch (error) {
		console.log(error)

		return Response.json(
			{ error: 'Erro interno do servidor' },
			{ status: 500 }
		)
	}
}