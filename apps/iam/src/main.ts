import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = app.get<Logger>(Logger);
  app.useLogger(logger);

  app.setGlobalPrefix('api');

  const port = Number(process.env.PORT) || 3001;
  const host = '0.0.0.0';

  await app.listen(port, host);
  logger.log(`IAM service running on http://${host}:${port}`);
}
bootstrap();
