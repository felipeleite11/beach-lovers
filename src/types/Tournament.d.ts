interface Tournament {
	id: number
	title: string
	image?: string
	price?: number
	datetime: string
	subscriptions: Subscription[]
	amount?: number // in cents
	offered_subscriptions?: number
	remaining_subscriptions?: number
	subscription_period: {
		start: string
		end: string
	}
	management: Person[]
	categories: Category[]
	arena?: Arena
	status: 'available_subscription' | 'cancelled' | 'finished'
}