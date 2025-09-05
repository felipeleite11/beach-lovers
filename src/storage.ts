import { format } from "date-fns"

export const tournaments: Tournament[] = [
	{
		id: 1,
		title: 'Bolão Garden City 2',
		offered_subscriptions: 16,
		remaining_subscriptions: 14,
		status: 'finished',
		image: '/images/arena.png',
		categories: [
			{
				id: 1,
				name: 'Masculina C'
			},
			{
				id: 2,
				name: 'Masculina D'
			}
		],
		subscriptions: [
			{
				id: 1,
				user: {
					id: 1,
					name: 'Felipe Leite',
					image: '/images/boy.jpg'
				},
				date: format(new Date(), 'dd/MM/yyyy HH:mm'),
				price: 1000
			},
			{
				id: 2,
				user: {
					id: 2,
					name: 'Kleizy Guimarães',
					image: '/images/girl.png'
				},
				date: format(new Date(), 'dd/MM/yyyy HH:mm'),
				price: 1000
			}
		],
		price: 1000,
		datetime: '08/10/2025, das 10h às 16h',
		amount: 2000,
		subscription_period: {
			start: format(new Date(), 'dd/MM/yyyy HH:mm'),
			end: format(new Date(), 'dd/MM/yyyy HH:mm')
		},
		management: [
			{
				id: 1,
				name: 'Felipe Leite',
				slug: 'felipe-leite',
				gender: 'M',
				image: '/images/boy.jpg',
				status: {
					defeats: 4,
					wins: 7,
					tournament_management: 15
				}
			}
		],
		arena: {
			id: 1,
			address: 'Rod. Augusto Montenegro, 1000',
			name: 'Condomínio Cidade Jardim II',
			image: '/images/arena.png',
			position: {
				lat: 0,
				lng: 0
			},
			gallery: [],
			region: {
				id: 1,
				name: 'Augusto Montenegro / Icoaraci'
			}
		}
	},
	
	{
		id: 2,
		title: 'II Torneio Inter Arenas',
		offered_subscriptions: 48,
		remaining_subscriptions: 48,
		subscriptions: [],
		price: 1000,
		datetime: '14/10/2025, das 10h às 16h',
		amount: 0,
		image: '/images/arena.png',
		categories: [
			{
				id: 1,
				name: 'Masculina C'
			},
			{
				id: 2,
				name: 'Masculina D'
			}
		],
		subscription_period: {
			start: format(new Date(), 'dd/MM/yyyy HH:mm'),
			end: format(new Date(), 'dd/MM/yyyy HH:mm')
		},
		management: [
			{
				id: 1,
				name: 'Felipe Leite',
				slug: 'felipe-leite',
				gender: 'M',
				image: '/images/boy.jpg',
				status: {
					defeats: 4,
					wins: 7,
					tournament_management: 15
				}
			},
			{
				id: 2,
				name: 'Cleizi Guimarães',
				slug: 'kleizy-guimaraes',
				gender: 'F',
				image: '/images/girl.png',
				status: {
					defeats: 0,
					wins: 10
				}
			}
		],
		status: 'available_subscription',
		arena: {
			id: 1,
			address: 'Rod. Augusto Montenegro, 300',
			name: 'DBeach Premium',
			image: '/images/dbeach/1.jpg',
			position: {
				lat: 0,
				lng: 0
			},
			gallery: [],
			region: {
				id: 1,
				name: 'Augusto Montenegro / Icoaraci'
			}
		}
	}
]

export const people: Person[] = [
	{
		id: 1,
		name: 'Felipe Leite',
		slug: 'felipe-leite',
		gender: 'M',
		image: '/images/boy.jpg',
		status: {
			defeats: 4,
			wins: 7
		}
	},
	{
		id: 2,
		name: 'Cleizi Guimarães',
		slug: 'kleizy-guimaraes',
		gender: 'F',
		image: '/images/girl.png',
		status: {
			defeats: 0,
			wins: 10
		}
	}
]