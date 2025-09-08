interface Person {
	id: number
	name: string
	slug: string
	image?: string
	status?: {
		wins: number
		defeats: number
		tournament_management?: number
	}
	feature?: string
	gender: 'M' | 'F'
	equipment?: Equipment
	images?: Post[]
}