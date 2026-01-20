import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { LoggerModule } from 'nestjs-pino';
import { TobaccoModule } from 'src/modules/tobacco/tobacco.module';
import { SharedModule } from 'src/modules/shared/shared.module';
import { loggerOptions } from 'src/modules/shared/core/infrastructure/logger/logger.config';

@Module({
  imports: [TobaccoModule, SharedModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    LoggerModule.forRoot(loggerOptions()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
