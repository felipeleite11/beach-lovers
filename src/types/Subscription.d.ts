interface Subscription {
	id: string
	price?: number // in cents
	user?: User
	person: Person
	date: string
	category_id: string
}