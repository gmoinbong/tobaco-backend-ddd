import { IEmailSender } from "../domain/email-sender.interface";

export class SendOtpUseCase {
    constructor(
        private readonly emailSender: IEmailSender,
        private readonly otpGenerator: () => string,
    ) { }


    async execute(email: string): Promise<{ otp: string }> {
        const otp = this.otpGenerator();

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