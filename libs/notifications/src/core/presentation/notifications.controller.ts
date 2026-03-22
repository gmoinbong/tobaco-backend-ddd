import { Body, Controller, Post } from "@nestjs/common";
import { SendEmailUseCase } from "../application/send-email.use.case";
import { SendEmailDto } from "./dto/send-email.dto";
import { SendOtpUseCase } from "../application/send-otp.use.case";
import { SendOtpDto } from "./dto/send-otp.dto";

@Controller()
export class NotificationsController {

    constructor(
        private readonly sendEmailUseCase: SendEmailUseCase,
        private readonly sendOtpUseCase: SendOtpUseCase
    ) { }

    @Post('send-email')
    sendEmail(@Body() body: SendEmailDto) {
        return this.sendEmailUseCase.execute(body.from, body.to, body.subject, body.text, body.html);
    }

    @Post('send-otp')
    sendOtp(@Body() body: SendOtpDto) {
        return this.sendOtpUseCase.execute(body.email);
    }

}