import { prisma } from "@/lib/prisma"
import { NextRequest } from "next/server"

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	try {
		const { id } = params

		const response = await prisma.subscription.delete({
			where: {
				id
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