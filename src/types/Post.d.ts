import { Person } from "./Person";

interface PostImage {
  id: string;
  url: string;
  post_id?: string;
}

interface Post {
  id: string;
  description: string;
  created_at: string;
  author_id?: string;

  author: Person
  images: PostImage[];
  likes: Like[];
  comments: Partial<Comment>[];
}

export type PostCreateInput = Omit<Post, 'id' | 'created_at'>;
export type PostUpdateInput = Partial<Omit<Post, 'id' | 'created_at'>>;