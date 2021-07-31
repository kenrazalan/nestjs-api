// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('App');
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 9090;
  await app.listen(PORT);
  logger.log(`http://localhost:${PORT}`);
}
bootstrap();
