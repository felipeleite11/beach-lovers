// interface User {
// 	id: string
// 	image?: string
// 	name?: string
// 	email?: string
// }

export interface User {
	id: string;
	name: string;
	email: string;
	emailVerified: boolean;
	image: string | null;
	createdAt: string;
	person: Person
}

export type UserCreateInput = Omit<User, 'id' | 'createdAt'>;
export type UserUpdateInput = Partial<Omit<User, 'id' | 'createdAt'>>;