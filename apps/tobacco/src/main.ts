import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { Swagger } from '@shared/core/presentation/docs';
import { AppModule } from './app/app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      bufferLogs: true,
    });

    const logger = app.get<Logger>(Logger);
    app.useLogger(logger);

    app.setGlobalPrefix('api');
    Swagger.apply(app);

    const port = Number(process.env.PORT) || 3000;
    const host = '0.0.0.0';
    const msPort = Number(process.env.MS_PORT) || port + 1;

    app.connectMicroservice({
      transport: Transport.TCP,
      options: { host, port: msPort },
    });
    await app.startAllMicroservices();

    await app.listen(port, host);

    logger.log(`🚀 API is running on: http://${host}:${port}`);
    logger.log(`📡 Microservice TCP on ${host}:${msPort}`);
    logger.log(`📚 Swagger docs: http://${host}:${port}/api/docs`);
    logger.log(`🏥 Health check: http://${host}:${port}/api/health`);
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
}
bootstrap();
