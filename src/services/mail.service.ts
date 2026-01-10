import nodemailer from 'nodemailer';

export async function sendVerificationEmail(email: string, code: string) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: 'SOC Ticket <no-reply@soc-ticket.com>',
    to: email,
    subject: "Verify your email",
    text: `Your verification code is: ${code}`,
  });
}