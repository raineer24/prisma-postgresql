import { Post } from '@prisma/client';

export class PostEntity implements Post {
  authorId: string;
  body: string;
  likes: number;
  headerImage: string;
  isPublished: boolean;
  slug: string;
  id: string;
  published: boolean;
  title: string;
  content: string;
  updatedAt: Date;
  createdAt: Date;
}
