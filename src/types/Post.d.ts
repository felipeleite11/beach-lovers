interface Post {
	id: number
	author: Person
	url: string | string[]
	content: string
	date: string
	comments?: PostComment[]
	likes?: Like[]
}