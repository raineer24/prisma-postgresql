import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../prisma.service';
import { JwtStrategy } from './jwt.strategy';
import config from '../config';
import { UsersModule } from 'src/users/users.module';
import { JwtAuthGuard } from './jwt.guard';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { SharesService } from './shares/shares.service';
@Module({
  imports: [
    UsersModule,
    JwtModule.register({}),
    AccessTokenStrategy,
    RefreshTokenStrategy,
    SharesService,
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, PrismaService, UserService],
  exports: [AuthService],
})
export class AuthModule {}
