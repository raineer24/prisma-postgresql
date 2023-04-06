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
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { UpdateUserRequest } from 'src/users/models/request/update-user-request.model';
import { UserResponse } from 'src/users/models/user.response';
import { Usr } from 'src/users/user.decorator';
import { AuthUser } from '../auth-user';

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
   * route     Post /api/users/upload
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

  /********************************
   * desc      Query users with pagination pattern
   * route     Get /api/users/
   * access    Private
   */
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('pages?')
  async findAll(@Request() request) {
    return await this.userService.findAll(
      request.query.hasOwnProperty('page') ? request.query.page : 0,
      request.query.hasOwnProperty('size') ? request.query.size : 10,
      request.query.hasOwnProperty('search') ? request.query.search : '',
    );
  }

  // @UseGuards(JwtAuthGuard, UserIsUserGuard)
  // @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRequest: UpdateUserRequest,
    @Usr() user: AuthUser,
  ): Promise<UserResponse> {
    const userInfo = await this.userService.updateUser(id, updateRequest);
    return userInfo;
  }

  // @Roles(UserRole.ADMIN)
  // @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUserEntityById(
    @Param('id', ParseIntPipe) id: number,
    @Usr() user: AuthUser,
  ): Promise<UserResponse> {
    console.log('user 1', user);
    const userId = await this.userService.getUserEntityById(id);
    return userId;
  }
}
