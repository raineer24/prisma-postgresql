import { Post } from '@prisma/client';

export class PostEntity implements Post {
  authorId: string;
  body: string;
  likes: number | null;
  headerImage: string | null;
  isPublished: boolean;
  slug: string | null;
  id: string;
  published: boolean;
  title: string;
  content: string;
  updatedAt: Date;
  createdAt: Date;
}
