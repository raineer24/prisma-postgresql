import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import * as cookieParser from 'cookie-parser';
import cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(5000);
}
bootstrap();
