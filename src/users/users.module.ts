import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
//import { UsersController } from './users.controller';
import { JwtStrategy } from '../auth/jwt.strategy';

import { Paginate } from './paginate/paginate';
@Module({
  controllers: [],
  providers: [UsersService, Paginate],
})
export class UsersModule {}
