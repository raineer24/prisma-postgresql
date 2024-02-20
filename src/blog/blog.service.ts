import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';
import { Prisma } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogDto, EditBlogDto } from './dto';
import { PostEntity } from './entities/post.entity';
import { PostI } from './models/post';
import { PostsRepository } from './repositories/post.repository';
import { Paginate } from './paginate/paginate';
import { AppError } from 'src/errors/appError';

@Injectable()
export class BlogService {
  constructor(
    private prisma: PrismaService,
    private readonly repository: PostsRepository,
    private paginate: Paginate,
  ) {}

  async getAll() {
    try {
      const result = await this.prisma.post.findMany({
        include: {
          author: true,
        },
      });

      return result;
    } catch (error) {
      console.log('[GET ALL POSTS] Error.\n', error);
      throw new InternalServerErrorException('Failed to get all posts');
    }
  }

  async findAll(page: number, size: number, search: string) {
    const { results } = await this.paginate.pages(page, size);
    // const totalPages = Math.ceil(totalItems / size) - 1;
    const currentPage = Number(page);
    return {
      results,
      pagination: {
        // length: totalItems,
        size: size,
        // lastPage: totalPages,
        page: currentPage,
        startIndex: currentPage * size,
        endIndex: currentPage * size + (size - 1),
      },
    };
  }

  async createBlog(userId: number, dto: CreateBlogDto): Promise<PostEntity> {
    console.log('userid', userId);
    console.log('dto', dto);

    const data: Prisma.PostCreateInput = {
      ...dto,
      author: {
        connect: {
          id: userId,
        },
      },
    };
    console.log('data', data);
    delete data['hashedPassword'];
    return this.prisma.post.create({
      data, //mesma coisa que data: data
    });
  }

  async editBlogById(userId: number, dto: EditBlogDto, blogId: number) {
    const blog = await this.prisma.post.findUnique({
      where: {
        id: blogId,
      },
    });
    if (!blog || blog.authorId !== userId) {
      throw new ForbiddenException('Access to resource denied');
    }
    return this.prisma.post.update({
      where: {
        id: blogId,
      },
      data: {
        ...dto,
      },
    });
  }

  getBlogbyId(userId: number) {
    console.log('userid', userId);
    return this.prisma.post.findMany({
      where: {
        authorId: userId,
      },
    });
  }

  // findAll() {
  //   return this.repository.findAll();
  // }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  async getPost(postId: number) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: true,
      },
    });
    console.log('post,', post);
    if (!post) {
      throw new AppError('Post not found');
    }

    return post;
  }

  async deleteBlog(userId: number, blogId: number) {
    console.log('userId!', userId);
    const blog = await this.prisma.post.findUnique({
      where: {
        id: blogId,
      },
    });
    console.log('blogId', blog.authorId);
    if (!blog || blog.authorId !== userId) {
      throw new ForbiddenException('Access to resource denied');
    }
    await this.prisma.post.delete({
      where: {
        id: blogId,
      },
    });
  }
}
