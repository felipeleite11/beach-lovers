interface Comment {
  id: string;
  content: string;
  created_at: string;
  person_id?: string;
  post_id?: string;
  person: Person;
}