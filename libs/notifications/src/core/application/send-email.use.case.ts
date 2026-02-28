import { IEmailSender } from "../domain/email-sender.interface";

export class SendEmailUseCase {

    constructor(private readonly emailSender: IEmailSender) { }

    async execute(from: string, to: string, subject: string, text: string, html: string): Promise<void> {
        await this.emailSender.sendEmail({ from, to, subject, text, html });
    }

}

