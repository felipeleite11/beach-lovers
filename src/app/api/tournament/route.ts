import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'
import { headers } from 'next/headers'
import { isAfter, isBefore } from 'date-fns'
import { uploadToMinio } from '@/config/file-storage'

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url)

		const arenaId = searchParams.get('arena')
		const regionId = searchParams.get('region')
		const gender = searchParams.get('gender')

		let genderCondition = ''

		switch (gender) {
			case 'M':
				genderCondition = 'Masculino'
				break
			case 'F':
				genderCondition = 'Feminino'
				break
			default:
				genderCondition = ''
				break
		}

		const response = await prisma.tournament.findMany({
			include: {
				arena: true,
				subscriptions: {
					include: {
						person: true
					}
				},
				categories: {
					select: {
						category: true,
						slots: true
					},
					where: genderCondition ? {
						category: {
							name: {
								contains: genderCondition
							}
						}
					} : undefined
				}
			},
			orderBy: {
				created_at: 'desc'
			},
			where: {
				arena: {
					id: arenaId || undefined,
					region_id: regionId || undefined
				},
				categories: genderCondition ? {
					some: {
						category: {
							name: {
								contains: genderCondition
							}
						}
					}
				} : undefined,
				status: {
					not: 'cancelled'
				}
			}
		})

		const tournaments = response.map(item => {
			let status: string
			const now = new Date()

			if (item.status === 'cancelled') {
				status = 'cancelado'
			} else if (isBefore(now, item.subscription_start)) {
				status = 'inscrições não iniciadas'
			} else if (isBefore(item.subscription_start, now) && isBefore(now, item.subscription_end)) {
				status = 'inscrições abertas'
			} else if (isBefore(item.subscription_end, now) && isBefore(now, item.start_date)) {
				status = 'aguardando início'
			} else if (isBefore(item.start_date, now) && isBefore(now, item.end_date)) {
				status = 'acontecendo agora'
			} else {
				status = 'encerrado'
			}

			return {
				...item,
				status
			}
		})

		return Response.json(tournaments)
	} catch (error) {
		return Response.json(
			{ error: 'Erro interno do servidor' },
			{ status: 500 }
		)
	}
}

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData()

		const title = formData.get("title") as string
		const description = formData.get("description") as string
		const startDatetime = formData.get("start_datetime") as string
		const endDatetime = formData.get("end_datetime") as string
		const arena_id = formData.get("arena_id") as string
		const subscription_start = formData.get("subscription_start") as string
		const subscription_end = formData.get("subscription_end") as string
		const price = formData.get("price") as string
		const slots = formData.get("slots") as string
		const file = formData.get("image") as File
		const categories = (formData.get("categories") as string).split(',')
		let imageLink

		if (file) {
			imageLink = await uploadToMinio(file)
		}

		const session = await auth.api.getSession({
			headers: await headers()
		})

		const person = await prisma.person.findFirst({
			where: {
				userId: session?.user.id
			}
		})

		if (!person) {
			throw new Error('Pessoa não encontrada.')
		}

		const isSubscriptionsStarted = isAfter(new Date(), new Date(subscription_start))

		const response = await prisma.tournament.create({
			data: {
				title,
				description,
				start_date: new Date(startDatetime),
				end_date: new Date(endDatetime),
				arena_id,
				image: imageLink,
				price: +price,
				subscription_start: new Date(subscription_start),
				subscription_end: new Date(subscription_end),
				status: isSubscriptionsStarted ? 'available_subscription' : 'created',
				management: {
					connect: {
						id: person.id
					}
				},
				categories: {
					create: categories.map(category => ({
						category: {
							connect: {
								id: category
							}
						},
						slots: +slots
					}))
				}
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