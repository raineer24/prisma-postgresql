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
  HttpException,
  Patch,
  UseFilters,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../models/user';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { UpdateUserRequest } from '../../users/models/request/update-user-request.model';
import { UserResponse } from '../../users/models/user.response';
import { Usr } from '../../users/user.decorator';
import { AuthUser } from '../auth-user';
import { Roles } from '../../core/decorators/roles.decorator';
import { GetRefreshToken, GetUserId } from '../decorators';
import { AuthDto, UpdatedProfileDto } from '../dto';
import {
  AccessTokenGuard,
  RefreshTokenGuard,
  UserIsUserGuard,
} from '../guards';
import { ITokenPayloadWithRefreshToken } from '../interfaces';
import { UserService } from '../user/user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { HttpExceptionFilter } from './filters/http-exception.filter';
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
  ) {}

  // @Put(':id')
  // @UseFilters(HttpExceptionFilter)
  // async update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body('user') user: AuthUser,
  // ): Promise<AuthUser> {
  //   const res = await this.userService.update(id, user);
  //   console.log('res', res);
  //   if (res) {
  //     return res;
  //   }

  //   throw new NotFoundException();
  // }

  // @Patch('user/personal-information')
  // @UseGuards(RtGuard)
  // updateUserPersonalInformation(
  //   @Req() request,
  //   @Body() personalIBody: PersonalInformation,
  // ): Promise<PersonalInformation | HttpException> {
  //   personalIBody.userId = request.user.sub;
  //   return this.userService.updateUserPersonalInformation(personalIBody);
  // }

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

  @Put(':id/role')
  async updateRoleOfUser(
    @Param('id') id: number,
    @Body() updateRequest: UpdateUserRequest,
  ): Promise<UserResponse> {
    const updateRole = await this.userService.updateRoleOfUser(
      id,
      updateRequest,
    );

    return updateRole;
  }

  // @UseGuards(AccessTokenGuard, UserIsUserGuard)
  // @Put(':id')
  // @HttpCode(HttpStatus.OK)
  // async updateUser(
  //   @Param('id') id: number,
  //   @Body() updateRequest: UpdateUserRequest,
  //   @Usr() user: AuthUser,
  // ): Promise<UserResponse> {
  //   const userInfo = await this.userService.updateUser(id, updateRequest);
  //   return userInfo;
  // }

  @UseGuards(AccessTokenGuard, UserIsUserGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRequest: UpdateUserRequest,
    @Usr() user: AuthUser,
  ): Promise<UserResponse> {
    const userInfo = await this.userService.updateUser(id, updateRequest);
    if (userInfo) {
      return userInfo;
    }
    throw new NotFoundException();
  }

  //@Roles(UserType.ADMIN)
  // @UseGuards(AccessTokenGuard)
  // @Get(':id')
  // @HttpCode(HttpStatus.OK)
  // async getUserEntityById(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Usr() user: AuthUser,
  // ): Promise<UserResponse> {
  //   console.log('user 1', user);
  //   const userId = await this.userService.getUserEntityById(id);
  //   return userId;
  // }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  getUser(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<User | HttpException> {
    return this.userService.getUser(userId);
  }
}
