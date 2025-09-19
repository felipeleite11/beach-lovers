interface PersonRating {
  id: string;
  rating: number;
  created_at: string;
  rater_id: string;
  rated_id: string;
  rater: Person
  rated: Person
}