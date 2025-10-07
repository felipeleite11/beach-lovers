interface Tournament {
  id: string
  title: string
  description: string | null
  image: string | null
  start_date: string
  end_date: string
  arena_id: string | null
  price: number | null
  latitude: number
  longitude: number
  status: string
  subscription_start: string
  subscription_end: string
  created_at: string

  categories: Category[]
  info_items: TournamentInfoItem[]
  subscriptions: Subscription[]
  slots: TournamentSlot[]
  management: Person[]
  arena: Arena | null
  matches: Match[]
}

export type TournamentCreateInput = Omit<Tournament, 'id' | 'created_at'>
export type TournamentUpdateInput = Partial<Omit<Tournament, 'id' | 'created_at'>>
