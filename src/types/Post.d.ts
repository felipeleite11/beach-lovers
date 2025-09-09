interface Post {
	id: string
	author: Person
	images: {
		id: string
		url: string
	}[]
	description: string
	created_at: string
	comments?: PostComment[]
	likes?: Like[]
}