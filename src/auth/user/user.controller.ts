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

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  /********************************
   * desc      Upload
   * route     Post /api/auth/user/update-profile
   * access    Private
   */
  @UseGuards(AccessTokenGuard)
  @Post('upload')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('image'))
  async setProfile(
    @GetUserId() userId: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    return await this.userService.setProfile(file, userId);
  }
}
