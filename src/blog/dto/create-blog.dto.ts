import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  title: string;
  @IsString()
  content: string;

  // @IsString()
  // authorId: string;

  @IsString()
  body: string;

  @IsOptional()
  likes: number;

  @IsOptional()
  @IsString()
  headerImage: string;

  @IsOptional()
  @IsString()
  slug: string;

  @IsOptional()
  isPublished: boolean;
}
