import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "nestjs-pino";
import { loggerOptions } from "@shared/core/infrastructure/logger/logger.config";
import { SharedModule } from "@shared/shared.module";
import { JwtModule } from "@nestjs/jwt";
import { CacheModule } from "@nestjs/cache-manager";
import { NotificationsController } from "./core/presentation/notifications.controller";
import { SendEmailUseCase } from "./core/application/send-email.use.case";
import { SendOtpUseCase } from "./core/application/send-otp.use.case";
import { NOTIFICATIONS_TOKENS } from "./notifications.tokens";
import { NodemailerEmailSender } from "./core/infrastructure/nodemailer.email-sender";
import { IEmailSender } from "./core/domain/email-sender.interface";

@Module(
    {
        imports: [
            ConfigModule.forRoot({ isGlobal: true }),
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
        controllers: [NotificationsController],
        providers: [
            {
                provide: SendEmailUseCase,
                useFactory: (emailSender: IEmailSender) => new SendEmailUseCase(emailSender),
                inject: [NOTIFICATIONS_TOKENS.EMAIL_SENDER]
            },
            {
                provide: SendOtpUseCase,
                useFactory: (emailSender: IEmailSender) => new SendOtpUseCase(emailSender),
                inject: [NOTIFICATIONS_TOKENS.EMAIL_SENDER]
            },
            {
                provide: NOTIFICATIONS_TOKENS.EMAIL_SENDER,
                useClass: NodemailerEmailSender
            },
        ],
        exports: [
            SendEmailUseCase,
            SendOtpUseCase
        ],
    })

export class NotificationsModule { }