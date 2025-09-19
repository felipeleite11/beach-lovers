import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams

		const regionId = searchParams.get('region')

		const response = await prisma.arena.findMany({
			where: {
				region_id: regionId || undefined
			},
			include: {
				gallery: true,
				teachers: true,
				tournaments: {
					include: {
						categories: true
					}
				}
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