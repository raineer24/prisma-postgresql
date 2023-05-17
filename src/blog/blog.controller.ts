import {
  Controller,
  UseGuards,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpStatus,
  ParseIntPipe,
  HttpException,
} from '@nestjs/common';
import { HttpCode, Query } from '@nestjs/common/decorators';
import { Observable } from 'rxjs';
import { GetRefreshToken, GetUserId } from '../auth/decorators';
import {
  AccessTokenGuard,
  RefreshTokenGuard,
  UserIsUserGuard,
} from '../auth/guards';
import { BlogService } from './blog.service';
import { CreateBlogDto, EditBlogDto } from './dto';
import { PostEntity } from './entities/post.entity';
import { PostI } from './models/post';

@Controller('blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}

  // @UseGuards(AccessTokenGuard)
  // @Get('')
  // getBlogs(@GetUserId() userId: string) {
  //   console.log('getl', userId);
  //   return this.blogService.getBlogs(userId);
  // }

  @UseGuards(AccessTokenGuard)
  @Post()
  createBlog(@GetUserId() userId: number, @Body() dto: CreateBlogDto) {
    console.log('userid', userId);
    console.log('dto service', dto);
    return this.blogService.createBlog(userId, dto);
  }

  @Get()
  findBlogEntries(@Query('userId', ParseIntPipe) userId: number) {
    console.log('userid', userId);
    if (userId == null) {
      console.log('null');
      return this.blogService.findAll();
    } else {
      return this.blogService.getBlogbyId(userId);
    }
  }

  @Get('post/:postId')
  @UseGuards(AccessTokenGuard)
  getPost(
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<PostI | HttpException> {
    if (!postId) {
      throw new HttpException(
        'There is a problem. Please try again later what you want to do..',
        HttpStatus.NOT_IMPLEMENTED,
      );
    }
    return this.blogService.getPost(postId);
  }
}
