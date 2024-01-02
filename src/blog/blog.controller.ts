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
  Request,
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

  @Patch(':id')
  @UseGuards(AccessTokenGuard, UserIsUserGuard)
  editBlogById(
    @GetUserId() userId: number,
    @Body() dto: EditBlogDto,
    @Param('id', ParseIntPipe) blogId: number,
  ) {
    return this.blogService.editBlogById(userId, dto, blogId);
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  createBlog(@GetUserId() userId: number, @Body() dto: CreateBlogDto) {
    console.log('userid', userId);
    console.log('dto service', dto);
    return this.blogService.createBlog(userId, dto);
  }

  @Get('pages?')
  async findAll(@Request() request) {
    return await this.blogService.findAll(
      request.query.hasOwnProperty('page') ? request.query.page : 0,
      request.query.hasOwnProperty('size') ? request.query.size : 10,
      request.query.hasOwnProperty('search') ? request.query.search : '',
    );
  }

  @Get(':postId')
  @UseGuards(AccessTokenGuard)
  async getPost(
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<PostI | HttpException> {
    // if (!postId) {
    //   throw new HttpException(
    //     'There is a problem. Please try again later what you want to do..',
    //     HttpStatus.NOT_IMPLEMENTED,
    //   );
    // }
    return await this.blogService.getPost(postId);
  }

  // @Get(':id')
  // async findOne(@Param('postId', ParseIntPipe) postId: number) {
  //   return await this.blogService.getPost(postId);
  // }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  deleteBlog(
    @GetUserId() userId: number,
    @Param('id', ParseIntPipe) blogId: number,
  ) {
    return this.blogService.deleteBlog(userId, blogId);
  }
}
