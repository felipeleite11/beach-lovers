import { format } from "date-fns"

export const tournaments: Tournament[] = [
	{
		id: 1,
		title: '4º Bolão Garden City 2',
		description: `Chegou o 4º Bolão Garden City 2!

Chegou a hora de mostrar suas habilidades na areia! Estamos convocando todos os amigos para se inscreverem e participarem do nosso primeiro torneio de Beach Tênis.

Categorias D + iniciantes:

Duplas masculinas, femininas e mistas`,
		offered_subscriptions: 16,
		remaining_subscriptions: 14,
		status: 'available_subscription',
		image: '/images/cidade_jardim_2/3.jpg',
		video: 'https://www.youtube.com/embed/WV65FMd6fBE?si=Yue8UEp9q-E6MV2a',
		categories: [
			{
				id: 1,
				name: 'Mista C',
				subscriptions: [
					{
						id: 1,
						person: {
							gender: 'M',
							id: 1,
							name: 'Felipe Leite',
							slug: 'felipe-leite',
							image: 'https://mockmind-api.uifaces.co/content/human/222.jpg'
						},
						date: format(new Date(), 'dd/MM/yyyy HH:mm'),
						price: 1000
					},
					{
						id: 2,
						person: {
							gender: 'F',
							id: 2,
							name: 'Kleizy Guimarães',
							slug: 'kleizy-guimaraes',
							image: 'https://mockmind-api.uifaces.co/content/human/221.jpg'
						},
						date: format(new Date(), 'dd/MM/yyyy HH:mm'),
						price: 1000
					},
					{
						id: 3,
						person: {
							gender: 'M',
							id: 3,
							name: 'Gabriel Maués',
							slug: 'gabriel-maues',
							image: 'https://mockmind-api.uifaces.co/content/human/213.jpg'
						},
						date: format(new Date(), 'dd/MM/yyyy HH:mm'),
						price: 1000
					},
					{
						id: 4,
						person: {
							gender: 'F',
							id: 4,
							name: 'Jeovana Gabriely',
							slug: 'jeovana-gabriely',
							image: 'https://mockmind-api.uifaces.co/content/human/205.jpg'
						},
						date: format(new Date(), 'dd/MM/yyyy HH:mm'),
						price: 1000
					},
					{
						id: 5,
						person: {
							gender: 'M',
							id: 5,
							name: 'Lucas Andrade',
							slug: 'lucas-andrade',
							image: 'https://mockmind-api.uifaces.co/content/human/34.jpg'
						},
						date: format(new Date(), 'dd/MM/yyyy HH:mm'),
						price: 1000
					},
					{
						id: 6,
						person: {
							gender: 'F',
							id: 6,
							name: 'Mariana Costa',
							slug: 'mariana-costa',
							image: 'https://mockmind-api.uifaces.co/content/human/87.jpg'
						},
						date: format(new Date(), 'dd/MM/yyyy HH:mm'),
						price: 1000
					},
					{
						id: 7,
						person: {
							gender: 'M',
							id: 7,
							name: 'Pedro Henrique',
							slug: 'pedro-henrique',
							image: 'https://mockmind-api.uifaces.co/content/human/45.jpg'
						},
						date: format(new Date(), 'dd/MM/yyyy HH:mm'),
						price: 1000
					},
					{
						id: 8,
						person: {
							gender: 'F',
							id: 8,
							name: 'Isabela Moura',
							slug: 'isabela-moura',
							image: 'https://mockmind-api.uifaces.co/content/human/150.jpg'
						},
						date: format(new Date(), 'dd/MM/yyyy HH:mm'),
						price: 1000
					},
					{
						id: 9,
						person: {
							gender: 'M',
							id: 9,
							name: 'Rafael Santos',
							slug: 'rafael-santos',
							image: 'https://mockmind-api.uifaces.co/content/human/115.jpg'
						},
						date: format(new Date(), 'dd/MM/yyyy HH:mm'),
						price: 1000
					},
					{
						id: 10,
						person: {
							gender: 'F',
							id: 10,
							name: 'Carolina Silva',
							slug: 'carolina-silva',
							image: 'https://mockmind-api.uifaces.co/content/human/194.jpg'
						},
						date: format(new Date(), 'dd/MM/yyyy HH:mm'),
						price: 1000
					},
					{
						id: 11,
						person: {
							gender: 'M',
							id: 11,
							name: 'Bruno Almeida',
							slug: 'bruno-almeida',
							image: 'https://mockmind-api.uifaces.co/content/human/198.jpg'
						},
						date: format(new Date(), 'dd/MM/yyyy HH:mm'),
						price: 1000
					},
					{
						id: 12,
						person: {
							gender: 'F',
							id: 12,
							name: 'Fernanda Rocha',
							slug: 'fernanda-rocha',
							image: 'https://mockmind-api.uifaces.co/content/human/190.jpg'
						},
						date: format(new Date(), 'dd/MM/yyyy HH:mm'),
						price: 1000
					},
					{
						id: 13,
						person: {
							gender: 'M',
							id: 13,
							name: 'Gustavo Lima',
							slug: 'gustavo-lima',
							image: 'https://mockmind-api.uifaces.co/content/human/27.jpg'
						},
						date: format(new Date(), 'dd/MM/yyyy HH:mm'),
						price: 1000
					},
					{
						id: 14,
						person: {
							gender: 'F',
							id: 14,
							name: 'Patrícia Oliveira',
							slug: 'patricia-oliveira',
							image: 'https://mockmind-api.uifaces.co/content/human/110.jpg'
						},
						date: format(new Date(), 'dd/MM/yyyy HH:mm'),
						price: 1000
					},
					{
						id: 15,
						person: {
							gender: 'M',
							id: 15,
							name: 'Thiago Martins',
							slug: 'thiago-martins',
							image: 'https://mockmind-api.uifaces.co/content/human/201.jpg'
						},
						date: format(new Date(), 'dd/MM/yyyy HH:mm'),
						price: 1000
					},
					{
						id: 16,
						person: {
							gender: 'F',
							id: 16,
							name: 'Beatriz Souza',
							slug: 'beatriz-souza',
							image: 'https://mockmind-api.uifaces.co/content/human/193.jpg'
						},
						date: format(new Date(), 'dd/MM/yyyy HH:mm'),
						price: 1000
					}
				]
			},
			{
				id: 2,
				name: 'Masculina D',
				subscriptions: []
			}
		],
		price: 1000,
		datetime: '08/10/2025, das 10h às 16h',
		amount: 2000,
		subscription_period: {
			start: '01/09/2025, às 00:00h',
			end: '07/10/2025, às 23:59h'
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
		},
		teams: []
	},

	{
		id: 2,
		title: 'II Torneio Inter Arenas',
		description: `2º Torneio Inter Arenas de Beach Tênis 🎾

Chegou a hora de mostrar suas habilidades na areia! Estamos convocando todos os amigos para se inscreverem e participarem do nosso primeiro torneio de Beach Tênis.

✅ Categorias B + C + D:

• Duplas Masculinas
• Duplas Femininas`,
		offered_subscriptions: 48,
		remaining_subscriptions: 48,
		price: 1000,
		datetime: '14/10/2025, das 10h às 16h',
		amount: 0,
		image: '/images/arena.png',
		video: 'https://www.youtube.com/embed/WV65FMd6fBE?si=Yue8UEp9q-E6MV2a',
		categories: [
			{
				id: 1,
				name: 'Masculina C',
				subscriptions: []
			},
			{
				id: 2,
				name: 'Masculina D',
				subscriptions: []
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
		},
		teams: []
	}
]

export const people: Person[] = [
	{
		gender: 'M',
		id: 1,
		name: 'Felipe Leite',
		slug: 'felipe-leite',
		image: 'https://mockmind-api.uifaces.co/content/human/222.jpg',
		equipment: {
			image: '/images/raquete.png',
			name: 'Raquete NOX NG17 Silver'
		},
		images: [
			{
				author: {
					id: 1,
					name: 'Felipe Leite',
					gender: 'M',
					slug: 'felipe-leite'
				},
				id: 1,
				url: '/images/afluar/1.jpg',
				content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo, eveniet.',
				date: '01/09/2025 10:00'
			},
			{
				author: {
					id: 1,
					name: 'Felipe Leite',
					gender: 'M',
					slug: 'felipe-leite'
				},
				id: 2,
				url: '/images/afluar/2.jpg',
				content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo, eveniet.',
				date: '01/09/2025 11:00'
			},
			{
				author: {
					id: 1,
					name: 'Felipe Leite',
					gender: 'M',
					slug: 'felipe-leite'
				},
				id: 3,
				url: '/images/afluar/3.jpg',
				content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo, eveniet.',
				date: '01/09/2025 12:00'
			},
			{
				author: {
					id: 1,
					name: 'Felipe Leite',
					gender: 'M',
					slug: 'felipe-leite'
				},
				id: 4,
				url: '/images/afluar/3.jpg',
				content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo, eveniet.',
				date: '01/09/2025 12:00'
			},
			{
				author: {
					id: 1,
					name: 'Felipe Leite',
					gender: 'M',
					slug: 'felipe-leite'
				},
				id: 5,
				url: '/images/afluar/3.jpg',
				content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo, eveniet.',
				date: '01/09/2025 12:00'
			},
			{
				author: {
					id: 1,
					name: 'Felipe Leite',
					gender: 'M',
					slug: 'felipe-leite'
				},
				id: 6,
				url: '/images/afluar/3.jpg',
				content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo, eveniet.',
				date: '01/09/2025 12:00'
			},
			{
				author: {
					id: 1,
					name: 'Felipe Leite',
					gender: 'M',
					slug: 'felipe-leite'
				},
				id: 7,
				url: '/images/afluar/3.jpg',
				content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo, eveniet.',
				date: '01/09/2025 12:00'
			},
			{
				author: {
					id: 1,
					name: 'Felipe Leite',
					gender: 'M',
					slug: 'felipe-leite'
				},
				id: 8,
				url: '/images/afluar/3.jpg',
				content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo, eveniet.',
				date: '01/09/2025 12:00'
			},
			{
				author: {
					id: 1,
					name: 'Felipe Leite',
					gender: 'M',
					slug: 'felipe-leite'
				},
				id: 9,
				url: '/images/afluar/3.jpg',
				content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo, eveniet.',
				date: '01/09/2025 12:00'
			}
		]
	},
	{
		gender: 'F',
		id: 2,
		name: 'Kleizy Guimarães',
		slug: 'kleizy-guimaraes',
		image: 'https://mockmind-api.uifaces.co/content/human/221.jpg'
	},
	{
		gender: 'M',
		id: 3,
		name: 'Gabriel Maués',
		slug: 'gabriel-maues',
		image: 'https://mockmind-api.uifaces.co/content/human/213.jpg'
	},
	{
		gender: 'F',
		id: 4,
		name: 'Jeovana Gabriely',
		slug: 'jeovana-gabriely',
		image: 'https://mockmind-api.uifaces.co/content/human/205.jpg'
	},
	{
		gender: 'M',
		id: 5,
		name: 'Lucas Andrade',
		slug: 'lucas-andrade',
		image: 'https://mockmind-api.uifaces.co/content/human/34.jpg'
	},
	{
		gender: 'F',
		id: 6,
		name: 'Mariana Costa',
		slug: 'mariana-costa',
		image: 'https://mockmind-api.uifaces.co/content/human/87.jpg'
	},
	{
		gender: 'M',
		id: 7,
		name: 'Pedro Henrique',
		slug: 'pedro-henrique',
		image: 'https://mockmind-api.uifaces.co/content/human/45.jpg'
	},
	{
		gender: 'F',
		id: 8,
		name: 'Isabela Moura',
		slug: 'isabela-moura',
		image: 'https://mockmind-api.uifaces.co/content/human/150.jpg'
	},
	{
		gender: 'M',
		id: 9,
		name: 'Rafael Santos',
		slug: 'rafael-santos',
		image: 'https://mockmind-api.uifaces.co/content/human/115.jpg',
		equipment: {
			image: '/images/raquete.png',
			name: 'Raquete NOX NG17 Silver'
		}
	},
	{
		gender: 'F',
		id: 10,
		name: 'Carolina Silva',
		slug: 'carolina-silva',
		image: 'https://mockmind-api.uifaces.co/content/human/194.jpg'
	},
	{
		gender: 'M',
		id: 11,
		name: 'Bruno Almeida',
		slug: 'bruno-almeida',
		image: 'https://mockmind-api.uifaces.co/content/human/198.jpg'
	},
	{
		gender: 'F',
		id: 12,
		name: 'Fernanda Rocha',
		slug: 'fernanda-rocha',
		image: 'https://mockmind-api.uifaces.co/content/human/190.jpg'
	},
	{
		gender: 'M',
		id: 13,
		name: 'Gustavo Lima',
		slug: 'gustavo-lima',
		image: 'https://mockmind-api.uifaces.co/content/human/27.jpg'
	},
	{
		gender: 'F',
		id: 14,
		name: 'Patrícia Oliveira',
		slug: 'patricia-oliveira',
		image: 'https://mockmind-api.uifaces.co/content/human/110.jpg'
	},
	{
		id: 15,
		gender: 'M',
		name: 'Thiago Martins',
		slug: 'thiago-martins',
		image: 'https://mockmind-api.uifaces.co/content/human/201.jpg'
	},
	{
		id: 16,
		gender: 'F',
		name: 'Beatriz Souza',
		slug: 'beatriz-souza',
		image: 'https://mockmind-api.uifaces.co/content/human/193.jpg'
	}
]

export const arenas: Arena[] = [
	{
		id: 1,
		name: 'DBeach Premium',
		image: '/images/dbeach/dbeach.png',
		modalities: [
			'beach tennis',
			'voleibol'
		],
		contacts: ['(91) 99999-9999 (WhatsApp)', 'arenadbeach@gmail.com'],
		business_hours: 'Seg. a sex. 09h às 22h, sáb. 10h às 21h',
		day_use: 'Seg. a sex. 09h às 22h, sáb. 10h às 21h',
		region: {
			id: 1,
			name: 'Augusto Montenegro / Icoaraci'
		},
		gallery: [
			{
				title: 'Foto 1',
				url: '/images/dbeach/2.jpg',
				description: 'Areia tratada toda semana.'
			},
			{
				title: 'Foto 2',
				url: '/images/dbeach/3.jpg',
				description: 'Areia tratada toda semana.'
			},
			{
				title: 'Foto 3',
				url: '/images/dbeach/4.jpg',
				description: 'Areia tratada toda semana.'
			},
			{
				title: 'Foto 4',
				url: '/images/dbeach/5.jpg',
				description: 'Areia tratada toda semana.'
			},
			{
				title: 'Foto 5',
				url: '/images/dbeach/6.jpg',
				description: 'Areia tratada toda semana.'
			},
			{
				title: 'Foto 6',
				url: '/images/dbeach/7.jpg',
				description: 'Areia tratada toda semana.'
			},
			{
				title: 'Foto 7',
				url: '/images/dbeach/1.jpg',
				description: 'Areia tratada toda semana.'
			}
		],
		address: 'Rod. Augusto Montenegro, 300',
		tournaments: tournaments.filter(tournament => tournament.arena?.id === 1),
		teachers: [
			{
				id: 1,
				image: '/images/professor.jpg',
				name: 'Lucas Monteiro'
			},
			{
				id: 2,
				image: '/images/professor2.png',
				name: 'Nayana Cabral'
			}
		]
	},

	{
		id: 2,
		name: 'Afluar',
		image: '/images/afluar/afluar.png',
		modalities: ['beach tennis'],
		contacts: ['(91) 99999-9999 (WhatsApp)', 'arenadbeach@gmail.com'],
		region: {
			id: 3,
			name: 'Belém Centro'
		},
		gallery: [
			{
				title: 'Foto 1',
				url: '/images/afluar/1.jpg',
				description: 'Areia tratada toda semana.'
			},
			{
				title: 'Foto 2',
				url: '/images/afluar/2.jpg',
				description: 'Areia tratada toda semana.'
			},
			{
				title: 'Foto 3',
				url: '/images/afluar/3.jpg',
				description: 'Areia tratada toda semana.'
			},
			{
				title: 'Foto 4',
				url: '/images/afluar/4.jpg',
				description: 'Areia tratada toda semana.'
			},
			{
				title: 'Foto 5',
				url: '/images/afluar/5.png',
				description: 'Areia tratada toda semana.'
			}
		],
		address: 'Rua São Boaventura, 104 - Cidade Velha',
		tournaments: []
	},

	{
		id: 3,
		name: 'Condomínio Cidade Jardim II',
		image: '/images/cidade_jardim_2/3.jpg',
		modalities: ['beach tennis'],
		contacts: ['(91) 99999-9999 (WhatsApp)', 'cidadejardim2@gmail.com'],
		region: {
			id: 1,
			name: 'Augusto Montenegro / Icoaraci'
		},
		gallery: [
			{
				title: 'Foto 1',
				url: '/images/cidade_jardim_2/1.jpg',
				description: 'Areia tratada toda semana.'
			},
			{
				title: 'Foto 2',
				url: '/images/cidade_jardim_2/2.jpg',
				description: 'Areia tratada toda semana.'
			},
			{
				title: 'Foto 3',
				url: '/images/cidade_jardim_2/3.jpg',
				description: 'Areia tratada toda semana.'
			},
			{
				title: 'Foto 4',
				url: '/images/cidade_jardim_2/4.jpg',
				description: 'Areia tratada toda semana.'
			},
			{
				title: 'Foto 5',
				url: '/images/cidade_jardim_2/5.jpg',
				description: 'Areia tratada toda semana.'
			}
		],
		address: 'Rod. Augusto Montenegro, 1000',
		tournaments: tournaments.filter(tournament => tournament.arena?.id === 3)
	}
]

export const user: User = {
	id: 1,
	name: 'Felipe Leite',
	image: 'https://mockmind-api.uifaces.co/content/human/149.jpg'
}