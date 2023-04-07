import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import SwaggerDocumentation from './swagger';
import { AppModule } from './app.module';
//import * as cookieParser from 'cookie-parser';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const appMode = configService.get<string>('NODE_ENV') || 'development';
  app.setGlobalPrefix('api');
  app.use(cookieParser());

  //app.enableCors();

  if (appMode === 'development') {
    app.enableCors();
  } else {
    app.enableCors({
      credentials: true,
      origin: [
        'http://localhost:8000',
        'http://localhost:3000',
        'http://localhost:5000',
      ],
    });
  }

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const swaggerDoc = new SwaggerDocumentation(app);
  swaggerDoc.serve();
  await app.listen(5000);
}
bootstrap();
