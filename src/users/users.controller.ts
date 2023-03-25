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
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { UsersService } from './users.service';
import { AuthUser } from '../auth/auth-user';
import { Usr } from './user.decorator';
import { UserResponse } from './models/user.response';
import { UpdateUserRequest } from './models/request/update-user-request.model';
import { Roles } from '../core/decorators/roles.decorator';
import User, { UserRole } from '../core/entities/user.entity';
import { RoleGuard } from 'src/auth/role.guard';
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
  @Roles(UserRole.ADMIN)
  @UseGuards(RoleGuard)
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

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRequest: UpdateUserRequest,
    @Usr() user: AuthUser,
  ): Promise<void> {
    await this.usersService.updateUser(id, updateRequest);
  }
}
