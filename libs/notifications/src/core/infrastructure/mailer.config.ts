import * as nodemailer from 'nodemailer';

let _transporter: nodemailer.Transporter | null = null;

export const getTransporter = () => {
    if (!_transporter) {
        _transporter = nodemailer.createTransport({
            host: process?.env?.EMAIL_HOST,
            port: process?.env?.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        } as nodemailer.TransportOptions | nodemailer.Transport<unknown, nodemailer.TransportOptions>);
    }
    return _transporter
}
