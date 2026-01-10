import { prisma } from '../lib/prisma.js';
import bcrypt from 'bcrypt';

const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  const passwordHash = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
    select: {
      userID: true,
      name: true,
      email: true,
    },
  });
};

export { createUser };