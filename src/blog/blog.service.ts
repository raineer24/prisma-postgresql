import { Injectable } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';
import { Prisma } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogDto, EditBlogDto } from './dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async createBlog(userId: string, dto: CreateBlogDto): Promise<PostEntity> {
    console.log('userid', userId);
    const postId = uuid();
    // const createdPost = await this.prisma.post.create({
    //   data: {
    //     ...dto,
    //     id: postId,
    //     authorId: userId,
    //   },
    // });

    const data: Prisma.PostCreateInput = {
      ...dto,
      id: postId,
      author: {
        connect: {
          id: userId,
        },
      },
    };
    console.log('data', data);

    return this.prisma.post.create({
      data, //mesma coisa que data: data
    });
  }

  getBlogs(userId: string) {
    console.log('userid', userId);
    return this.prisma.post.findMany({
      where: {
        authorId: userId,
      },
    });
  }
}
