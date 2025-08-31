interface Tournament {
	id: number
	title: string
	price?: number
	subscriptions: Subscription[]
	amount?: number // in cents
	offered_subscriptions?: number
	remaining_subscriptions?: number
	subscription_period: {
		start: string
		end: string
	}
	place: Place
	status: 'available_subscription' | 'cancelled' | 'finished'
}