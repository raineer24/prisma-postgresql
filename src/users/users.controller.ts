import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getMyUser(@Param() params: { id: string }) {
    return;
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
}
