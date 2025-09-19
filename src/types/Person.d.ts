import { Post } from "./Post";

interface Person {
	id: string;
	name: string;
	slug: string;
	image: string | null;
	category?: string | null;
	wins?: number;
	defeats?: number;
	wos?: number;
	start_playing_date?: string | null;
	userId?: string;
	birthdate?: string | null;
	createdAt?: Date;
	gender: 'M' | 'F' | null;
	equipment: Equipment | null;

	user?: User;
	posts?: Post[];
	likes?: Like[];
	comments?: Comment[];
	subscriptions?: Subscription[];
	managedTournaments?: Tournament[];
	equipment?: Equipment | null;
	announcements?: Announcement[];
	teacher_ratings?: TeacherRating[];
	team_members?: TeamMember[];
	ratings_given?: PersonRating[];
	ratings_received?: PersonRating[];
}

export type PersonCreateInput = Omit<Person, 'id' | 'createdAt'>;
export type PersonUpdateInput = Partial<Omit<Person, 'id' | 'createdAt'>>;

// interface Person {
// 	id: string
// 	name: string
// 	slug?: string
// 	image?: string
// 	birthdate?: string
// 	category?: string
// 	start_playing_date?: string
// 	wins?: number
// 	defeats?: number
// 	wos?: number
// 	status?: {
// 		wins: number
// 		defeats: number
// 		tournament_management?: number
// 	}
// 	feature?: string
// 	gender?: 'M' | 'F'
// 	equipment?: Equipment
// 	posts?: Post[]
// 	user?: User
// }