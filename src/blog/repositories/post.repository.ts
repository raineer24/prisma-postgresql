import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
//import { CreatePostDto } from '../dto/create-post.dto';
//import { UpdatePostDto } from '../dto/update-post.dto';
import { PostEntity } from '../entities/post.entity';
//import { NotFoundError } from 'src/common/errors/types/NotFoundError';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<PostEntity[]> {
    console.log('findALL');
    return this.prisma.post.findMany({
      include: {
        author: {
          select: {
            firstName: true,
            email: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    console.log('finDOne');
    return this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
      },
    });
  }
}
