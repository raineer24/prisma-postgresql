import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
//import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { ConfigModule } from '@nestjs/config';
import { MulterConfig } from './features/configs/multer.config';
import { PrismaModule } from './prisma/prisma.module';
import { BlogModule } from './blog/blog.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    AuthModule,
    PrismaModule,
    CloudinaryModule,
    BlogModule,
    MulterModule.register(MulterConfig),
  ],
  providers: [],
})
export class AppModule {}
