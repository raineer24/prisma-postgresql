import { Injectable } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';
import { v4 as uuid } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogDto, EditBlogDto } from './dto';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async createBlog(userId: string, dto: CreateBlogDto) {
    console.log('userid', userId);
    const postId = uuid();
    const createdPost = await this.prisma.post.create({
      data: {
        ...dto,
        id: postId,
        authorId: userId,
      },
    });
  }

  getBlogs(userId: string) {
    console.log('userid',userId)
    return this.prisma.post.findMany({
      where: {
        authorId: userId,
      },
    });
  }
}
