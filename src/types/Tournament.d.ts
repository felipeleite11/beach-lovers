interface Tournament {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  date: string;
  arena_id: string | null;
  price: number | null;
  status: string;
  subscription_start: string;
  subscription_end: string;
  created_at: string;

  categories: Category[];
  info_items: TournamentInfoItem[];
  subscriptions: Subscription[];
  slots: TournamentSlot[];
  management: Person[];
  arena: Arena | null;
  matches: Match[];
}

export type TournamentCreateInput = Omit<Tournament, 'id' | 'created_at'>;
export type TournamentUpdateInput = Partial<Omit<Tournament, 'id' | 'created_at'>>;

// import { Arena, Person } from "./PrismaTypes"

// interface Tournament {
// 	id?: string
// 	title: string
// 	description?: string
// 	image?: File | null
// 	// video?: string
// 	price?: string
// 	datetime: string
// 	// amount?: number // in cents
// 	// offered_subscriptions?: number
// 	// remaining_subscriptions?: number
// 	subscription_start: string
// 	subscription_end: string
// 	categories?: Category[]
// 	subscriptions?: Subscription[]
// 	management?: Person[]
// 	slots?: Slot[]
// 	arena?: Arena
// 	status?: 'created' | 'available_subscription' | 'cancelled' | 'finished'
// 	// teams?: Pair[]
// }