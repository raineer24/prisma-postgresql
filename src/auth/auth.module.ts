import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import config from '../config';
import { JwtAuthGuard } from './jwt.guard';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { SharesService } from './shares/shares.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfig } from '../features/configs/multer.config';
import { Paginate } from '../users/paginate/paginate';
@Module({
  imports: [
    PrismaModule,
    JwtModule.register({}),
    PassportModule.register({}),
    CloudinaryModule,
    MulterModule.register(MulterConfig),
  ],
  controllers: [AuthController, UserController],
  providers: [
    AuthService,
    UserService,
    SharesService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    Paginate,
    PrismaService,
  ],
})
export class AuthModule {}
