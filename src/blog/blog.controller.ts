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
import { HttpCode } from '@nestjs/common/decorators';
import { GetRefreshToken, GetUserId } from '../auth/decorators';
import {
  AccessTokenGuard,
  RefreshTokenGuard,
  UserIsUserGuard,
} from '../auth/guards';
import { BlogService } from './blog.service';
import { CreateBlogDto, EditBlogDto } from './dto';

@UseGuards(AccessTokenGuard)
@Controller('blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}
  @Get('')
  getBlogs(@GetUserId() userId: string) {
    console.log('getl', userId);
    return this.blogService.getBlogs(userId);
  }
}
