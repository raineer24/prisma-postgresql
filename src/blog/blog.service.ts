import { Injectable } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';

import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogDto, EditBlogDto } from './dto';

@Injectable()
export class BlogService {}
