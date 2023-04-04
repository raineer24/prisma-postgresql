import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import { GetRefreshToken, GetUserId } from '../decorators';
import { AuthDto, UpdatedProfileDto } from '../dto';
import { AccessTokenGuard, RefreshTokenGuard } from '../guards';
import { ITokenPayloadWithRefreshToken } from '../interfaces';
import { UserService } from '../user/user.service';

@Controller('auth/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}
}
