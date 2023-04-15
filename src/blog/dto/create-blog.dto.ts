import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  title: string;
  @IsString()
  content: string;

  @IsString()
  authorId: string;

  @IsString()
  body: string;
  likes: number;
  @IsString()
  headerImage: string;
  @IsString()
  slug: string;

  isPublished: boolean;
}
