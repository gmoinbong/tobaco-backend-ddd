import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { Swagger } from './modules/shared/core/presentation/docs';
import { AppModule } from './app/app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      bufferLogs: true,
      snapshot: true,
    });

    const logger = app.get<Logger>(Logger);

    app.useLogger(logger);

    // Global prefix
    app.setGlobalPrefix('api');

    Swagger.apply(app);

    const port = process.env.PORT ?? 3000;
    const host = '0.0.0.0'; // Always listen on all interfaces inside container

    await app.listen(port, host);

    logger.log(`🚀 API is running on: http://${host}:${port}`);
    logger.log(`📚 Swagger docs: http://${host}:${port}/api/docs`);
    logger.log(`🏥 Health check: http://${host}:${port}/api/health`);
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
}
bootstrap();
