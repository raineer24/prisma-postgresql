import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { PostsRepository } from './repositories/post.repository';
import { Paginate } from './paginate/paginate';

@Module({
  controllers: [BlogController],
  providers: [BlogService, PrismaService, PostsRepository, Paginate],
  exports: [BlogService],
  imports: [AuthModule],
})
export class BlogModule {}
