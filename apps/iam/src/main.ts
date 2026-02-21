import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { Transport } from '@nestjs/microservices';
import { IAMModule } from './module/iam.module';
import { Swagger } from '@shared/index';

async function bootstrap() {
  const app = await NestFactory.create(IAMModule, { bufferLogs: true });
  const logger = app.get<Logger>(Logger);
  app.useLogger(logger);

  app.setGlobalPrefix('api');

  Swagger.apply(app);

  const port = Number(process.env.IAM_PORT) || 3002;
  const host = '0.0.0.0';
  const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
  app.connectMicroservice({
    transport: Transport.REDIS,
    options: { url: redisUrl },
  });
  await app.startAllMicroservices();

  await app.listen(port, host);
  logger.log(`IAM service running on http://${host}:${port}`);
  logger.log(`Redis microservice connected`);
}

bootstrap();