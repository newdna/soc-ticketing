export function isValidEmail(email: string): boolean{
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
}

export function verificationEmailText(code: string): string {
  return `
    Welcome to SOC Ticketing!

    Your email verification code is:

    ${code}

    This code will expire in 10 minutes.

    If you did not request this, please ignore this email.

    — SOC Ticketing Team
    `;
}


export function verificationEmailHtml(code: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8" />
    <title>Email Verification</title>
    <style>
        body {
        background-color: #f4f6f8;
        font-family: Arial, Helvetica, sans-serif;
        padding: 20px;
        }
        .container {
        max-width: 480px;
        margin: auto;
        background: #ffffff;
        border-radius: 8px;
        padding: 24px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        .code {
        font-size: 32px;
        letter-spacing: 6px;
        font-weight: bold;
        text-align: center;
        margin: 20px 0;
        color: #1a73e8;
        }
        .footer {
        margin-top: 24px;
        font-size: 12px;
        color: #777;
        text-align: center;
        }
    </style>
    </head>
    <body>
    <div class="container">
        <h2>Verify your email</h2>
        <p>
        Thanks for registering with <strong>SOC Ticketing</strong>.
        </p>
        <p>
        Use the verification code below to complete your registration:
        </p>

        <div class="code">${code}</div>

        <p>
        This code expires in <strong>10 minutes</strong>.
        </p>

        <p>
        If you did not request this, you can safely ignore this email.
        </p>

        <div class="footer">
        © ${new Date().getFullYear()} SOC Ticketing
        </div>
    </div>
    </body>
    </html>
    `;
}
