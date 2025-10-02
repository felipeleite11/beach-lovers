interface Subscription {
  id: string;
  created_at: string;
  tournament_id: string;
  person_id: string;
  category_id: string;
  person: Person
}