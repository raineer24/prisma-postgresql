import { Post } from '@prisma/client';

export class PostEntity implements Post {
  authorId: number;
  likes: number | null;
  headerImage: string | null;
  isPublished: boolean;
  slug: string | null;
  id: number;
  published: boolean;
  title: string;
  content: string;
  updatedAt: Date;
  createdAt: Date;
}
