import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';

export async function signup(username: string, password: string) {
  const existingUser = await prisma.user.findFirst({ where: { username } });
  if (existingUser) {
    throw new Error('Username already exists.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      credits: 10,
      role: 'USER',
    },
  });

  return { id: user.id, username: user.username, role: user.role };
}

export async function signin(username: string, password: string) {
  const user = await prisma.user.findFirst({ where: { username } });
  if (!user) {
    throw new Error('Invalid username or password.');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid username or password.');
  }

  const now = new Date();

  const alreadyLoggedInToday =
    user.logged_in_at &&
    user.logged_in_at.getFullYear() === now.getFullYear() &&
    user.logged_in_at.getMonth() === now.getMonth() &&
    user.logged_in_at.getDate() === now.getDate();

  if (!alreadyLoggedInToday) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        credits: { increment: 1 },
        logged_in_at: now,
      },
    });
    return {
      id: user.id,
      username: user.username,
      role: user.role,
      message: 'You won a credit!',
    };
  } else {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        logged_in_at: now,
      },
    });
    return {
      id: user.id,
      username: user.username,
      role: user.role,
      message: 'Signin successful',
    };
  }
}

export async function deleteAccount(userId: string) {
  await prisma.savedPost.deleteMany({ where: { user_id: userId } });
  await prisma.user.delete({ where: { id: userId } });
}

export async function getUserById(userId: string) {
  return await prisma.user.findUnique({ where: { id: userId } });
}
