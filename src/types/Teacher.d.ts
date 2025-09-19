// interface Teacher {
// 	id: string
// 	name: string
// 	slug: string
// 	image?: string
// }

import { Person } from "./Person";

interface Teacher {
  id: string;
  slug: string | null;
  name: string;
  image: string | null;
  phone: string | null;
  email: string | null;
  ratings: TeacherRating[] | null
  arenas?: Arena[]
}

interface TeacherRating {
  id: string;
  rating: number;
  comment: string | null;
  created_at: Date;
  person_id: string;
  teacher_id: string;
  person?: Person
}