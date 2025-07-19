import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 5000);
}

void bootstrap();
