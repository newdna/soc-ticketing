import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { verificationEmailHtml, verificationEmailText } from '../utils/user.utils.js';

dotenv.config(); 

export async function sendVerificationEmail(email: string, code: string) {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
        },
    });

    await transporter.sendMail({
        from: '"SOC Ticket" <no-reply@soc-ticket.com>',
        to: email,
        subject: "Verify your email",
        text: verificationEmailText(code),
        html: verificationEmailHtml(code)
    });
}