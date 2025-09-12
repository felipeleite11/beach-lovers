interface Person {
	id: string
	name: string
	slug?: string
	image?: string
	birthdate?: string
	category?: string
	start_playing_date?: string
	wins?: number
	defeats?: number
	wos?: number
	status?: {
		wins: number
		defeats: number
		tournament_management?: number
	}
	feature?: string
	gender?: 'M' | 'F'
	equipment?: Equipment
	posts?: Post[]
}