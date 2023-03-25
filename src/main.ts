import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import SwaggerDocumentation from './swagger';
import { AppModule } from './app.module';
//import * as cookieParser from 'cookie-parser';
import cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  // app.enableCors({
  //   origin: ['http://localhost:5000', 'https://fr-blog-vercel.vercel.app'],
  //   allowedHeaders: ['Accept', 'Content-Type'],
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   preflightContinue: false,
  //   optionsSuccessStatus: 204,
  //   credentials: true,
  // });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const swaggerDoc = new SwaggerDocumentation(app);
  swaggerDoc.serve();
  await app.listen(5000);
}
bootstrap();
