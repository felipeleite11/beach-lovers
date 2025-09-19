// interface Subscription {
// 	id: string
// 	price?: number // in cents
// 	user?: User
// 	person: Person
// 	date: string
// 	category_id: string
// }

interface Subscription {
  id: string;
  created_at: string;
  tournament_id: string;
  person_id: string;
  category_id: string;
}