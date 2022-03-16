import { config as dotenv } from 'dotenv';
dotenv();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.set('trust proxy', true);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));

  await app.listen(1337);
}
bootstrap();
