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
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { UsersService } from './users.service';
import { AuthUser } from '../auth/auth-user';
import { Usr } from './user.decorator';
import { UserResponse } from './models/user.response';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //@UseGuards(JwtAuthGuard)
  // @Get(':id')
  // getMyUser(@Param() params: { id: string }, @Req() req) {
  //   return this.usersService.getMyUser(params.id, req);
  // }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

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
}
