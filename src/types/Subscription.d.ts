interface Subscription {
	id: number
	price?: number // in cents
	user?: User
	person: Person
	date: string
}