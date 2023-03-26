import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtStrategy } from '../auth/jwt.strategy';
import { PrismaService } from '../prisma.service';
import { Paginate } from './paginate/paginate';
@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, Paginate],
})
export class UsersModule {}
