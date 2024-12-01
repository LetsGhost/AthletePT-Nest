import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.enableCors();
  await app.listen(process.env.PORT);
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
