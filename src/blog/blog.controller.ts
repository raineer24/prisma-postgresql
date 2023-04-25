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
} from '@nestjs/common';
import { HttpCode, Query } from '@nestjs/common/decorators';
import { GetRefreshToken, GetUserId } from '../auth/decorators';
import {
  AccessTokenGuard,
  RefreshTokenGuard,
  UserIsUserGuard,
} from '../auth/guards';
import { BlogService } from './blog.service';
import { CreateBlogDto, EditBlogDto } from './dto';

@Controller('blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}

  // @UseGuards(AccessTokenGuard)
  // @Get('')
  // getBlogs(@GetUserId() userId: string) {
  //   console.log('getl', userId);
  //   return this.blogService.getBlogs(userId);
  // }

  @Post()
  createBlog(@GetUserId() userId: number, @Body() dto: CreateBlogDto) {
    console.log('dto service', dto);
    return this.blogService.createBlog(userId, dto);
  }

  @Get()
  findBlogEntries(@Query('userId') userId: number) {
    if (userId == null) {
      return this.blogService.findAll();
    } else {
      return this.blogService.findOne(userId);
    }
  }
}
