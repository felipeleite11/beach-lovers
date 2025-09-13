interface Post {
	id: string
	description: string
	images: PostImage[]
}

interface PostImage {
	id: string
	url: string
	post: Post
}