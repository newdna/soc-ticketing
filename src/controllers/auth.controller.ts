import express from 'express';
import { createUser }from '../services/auth.service.js';
import { userLogin } from '../services/login.service.js';
import { isValidEmail, generateVerificationCode } from '../utils/user.utils.js';
import { sendVerificationEmail } from '../services/mail.service.js';
import { prisma } from '../lib/prisma.js';

export const register = async (req: express.Request, res: express.Response) => {
    const { name, email, password } = req.body ?? {};

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Missing fields" });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    const code = generateVerificationCode();

    await prisma.auth.upsert({
        where: { email },
        update: {
        code,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min
        },
        create: {
        email,
        code,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        },
    });

    await sendVerificationEmail(email, code);

    return res.status(200).json({
        message: "Verification code sent to email",
    });
};

export const verifyEmail = async (req: express.Request, res: express.Response) => {
    const { name, email, password, code } = req.body;

    const record = await prisma.auth.findUnique({
        where: { email },
    });

    if (!record || record.code !== code) {
        return res.status(400).json({ message: "Invalid code" });
    }

    if (record.expiresAt < new Date()) {
        return res.status(400).json({ message: "Code expired" });
    }

    // Create user
    const user = await createUser(name, email, password);

    // cleanup
    await prisma.auth.delete({ where: { email } });

    return res.status(201).json({
        message: "Email verified & user created",
        user,
    });
};


export const hello = async (req: express.Request, res: express.Response) => {
    res.status(201).json({ message: req.body.user });
};

export const login = async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body ?? {};
    const user = await userLogin(email, password);
    res.status(201).json({ message: user });
};