import { IEmailSender } from "../domain/email-sender.interface";
import { getTransporter } from "./mailer.config";

export class NodemailerEmailSender implements IEmailSender {
    async sendEmail(email: { from: string; to: string; subject: string; text: string; html: string; }): Promise<void> {
        await getTransporter().sendMail(email)
    }
}
