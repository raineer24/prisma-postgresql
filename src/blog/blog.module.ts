import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { PostsRepository } from './repositories/post.repository';

@Module({
  controllers: [BlogController],
  providers: [BlogService, PrismaService, PostsRepository],
  exports: [BlogService],
})
export class BlogModule {}
