import {
  Controller,
  Get,
  Param,
  Req,
  UseGuards,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
  Body,
  UnauthorizedException,
  Put,
  Request,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { UsersService } from './users.service';
import { AuthUser } from '../auth/auth-user';
import { Usr } from './user.decorator';
import { UserResponse } from './models/user.response';
import { UpdateUserRequest } from './models/request/update-user-request.model';
import { Roles } from '../core/decorators/roles.decorator';
import User, { UserRole } from '../core/entities/user.entity';
import { RoleGuard } from '../auth/role.guard';
import { ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserIsUserGuard } from '../auth/UserIsUser.guard';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @Post('profile-setup')
  @HttpCode(200)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async setProfile(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: Request,
  ): Promise<any> {
    // if (
    //   request.body.phone_number != null ||
    //   request.body.phone_number != undefined
    // ) {
    const user: UserResponse = request['user'];
    console.log('request!!', request['file']);

    //   return await this.usersService.setProfile(file, id);
    // } else {
    //   return new HttpException(
    //     'Phone number is required',
    //     HttpStatus.NOT_FOUND,
    //   );
    // }

    return await this.usersService.setProfile(file, user.id);
  }

  @Get('pages?')
  async findAll(@Request() request) {
    return await this.usersService.findAll(
      request.query.hasOwnProperty('page') ? request.query.page : 0,
      request.query.hasOwnProperty('size') ? request.query.size : 10,
      request.query.hasOwnProperty('search') ? request.query.search : '',
    );
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Put(':id/role')
  async updateRoleOfUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRequest: UpdateUserRequest,
  ): Promise<UserResponse> {
    const updateRole = await this.usersService.updateRoleOfUser(
      id,
      updateRequest,
    );

    return updateRole;
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUserEntityById(
    @Param('id', ParseIntPipe) id: number,
    @Usr() user: AuthUser,
  ): Promise<UserResponse> {
    console.log('user 1', user);
    const userId = await this.usersService.getUserEntityById(id);
    return userId;
  }

  @UseGuards(JwtAuthGuard, UserIsUserGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRequest: UpdateUserRequest,
    @Usr() user: AuthUser,
  ): Promise<UserResponse> {
    const userInfo = await this.usersService.updateUser(id, updateRequest);
    return userInfo;
  }
}
