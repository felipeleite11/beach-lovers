import { Arena, Person } from "./PrismaTypes"

interface Tournament {
	id?: string
	title: string
	description?: string
	image?: File | null
	// video?: string
	price?: string
	datetime: string
	// amount?: number // in cents
	// offered_subscriptions?: number
	// remaining_subscriptions?: number
	subscription_start: string
	subscription_end: string
	categories?: Category[]
	subscriptions?: Subscription[]
	management?: Person[]
	slots?: Slot[]
	arena?: Arena
	status?: 'created' | 'available_subscription' | 'cancelled' | 'finished'
	// teams?: Pair[]
}