import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { loggerOptions } from '@shared/core/infrastructure/logger/logger.config';
import { AuthController } from './presentation/controllers/auth.controller';
import { UserController } from './presentation/controllers/user.controller';
import { AuthService } from './application/auth.service';
import { UserService } from './application/user.service';
import { IAMRepository } from './infrastructure/repositories/iam.repository';
import { IAM_DI_TOKENS } from './iam.tokens';
import { SharedModule } from '@shared/shared.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController, UserController],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot(loggerOptions()),
    SharedModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
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
export class IAMModule {}
