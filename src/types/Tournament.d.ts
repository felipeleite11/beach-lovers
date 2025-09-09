interface Tournament {
	id: number
	title: string
	description?: string
	image?: string
	video?: string
	price?: number
	datetime: string
	amount?: number // in cents
	offered_subscriptions?: number
	remaining_subscriptions?: number
	subscription_period: {
		start: string
		end: string
	}
	management: Person[]
	slots: Slot[]
	arena?: Arena
	status: 'available_subscription' | 'cancelled' | 'finished'
	teams?: Pair[]
}