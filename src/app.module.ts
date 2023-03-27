import { Module } from '@nestjs/common';
//import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Module({
  imports: [AuthModule, UsersModule, CloudinaryModule],
  providers: [PrismaService, CloudinaryService],
})
export class AppModule {}
