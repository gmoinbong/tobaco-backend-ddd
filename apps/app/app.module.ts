import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { LoggerModule } from 'nestjs-pino';
import { TobaccoModule } from '../tobacco/src/modules/tobacco/tobacco.module';
import { SharedModule } from '@shared/shared.module';
import { loggerOptions } from '@shared/core/infrastructure/logger/logger.config';
import { JetstreamModule } from '@horizon-republic/nestjs-jetstream';
import { AuthGatewayController } from './gateway/auth.gateway.controller';
import { NotificationsModule } from 'libs/notifications/src/notifications.module';
import { UsersGatewayController } from './gateway/users.gateway.controller';

@Module({
  imports: [TobaccoModule, SharedModule, NotificationsModule,
    JetstreamModule.forRoot({
      name: "gateway",
      servers: ['nats://localhost:4222'],
      consumer: false,
    }),
    JetstreamModule.forFeature({
      name: "iam",
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    LoggerModule.forRoot(loggerOptions()),
  ],
  controllers: [AppController, AuthGatewayController, UsersGatewayController],
  providers: [AppService],
})
export class AppModule { }
