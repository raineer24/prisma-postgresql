import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PrismaService } from '../prisma.service';
@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, PrismaService],
})
export class UsersModule {}
