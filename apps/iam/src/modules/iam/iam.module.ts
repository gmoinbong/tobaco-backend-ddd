import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { loggerOptions } from '@shared/core/infrastructure/logger/logger.config';
import { AuthNatsController } from './presentation/controllers/auth.nats.controller';
import { UserNatsController } from './presentation/controllers/user.nats.controler';
import { AuthService } from './application/auth.service';
import { UserService } from './application/user.service';
import { IAMRepository } from './infrastructure/repositories/iam.repository';
import { IAM_DI_TOKENS } from './iam.tokens';
import { SharedModule } from '@shared/shared.module';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtModule } from '@nestjs/jwt';
import { JetstreamModule } from '@horizon-republic/nestjs-jetstream';

@Module({
  controllers: [AuthNatsController, UserNatsController],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JetstreamModule.forRoot({
      name: 'iam',
      servers: [process.env.NATS_URL || 'nats://localhost:4222'],
    }),
    LoggerModule.forRoot(loggerOptions()),
    SharedModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    CacheModule.register({
      isGlobal: true,
    }),
  ],
  providers: [
    AuthService,
    UserService,
    {
      provide: IAM_DI_TOKENS.IAM_REPOSITORY,
      useClass: IAMRepository,
    },
  ],
})
export class IAMModule { }
