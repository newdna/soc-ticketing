import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { userID: user.userID },
    process.env.JWT_SECRET!,
    { expiresIn: "8h" }
  );

  return {
    token,
    user: {
      userID: user.userID,
      name: user.name,
      email: user.email,
    },
  };
};
