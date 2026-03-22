import { IEmailSender } from "../domain/email-sender.interface";
import { Otp } from "../domain/value-objects/otp.vo";

export class SendOtpUseCase {
    constructor(
        private readonly emailSender: IEmailSender,
    ) { }


    async execute(email: string): Promise<{ otp: string }> {
        const otp = Otp.create().getValue()
        await this.emailSender.sendEmail({
            from: process.env.EMAIL_USER!,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP is ${otp}`,
            html: `<p>Your OTP is <strong>${otp}</strong></p>`,
        });
        return { otp }
    }

}