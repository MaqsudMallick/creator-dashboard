import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { Error, RequestWithSession } from '../types/auth.types';

export async function signup(req: RequestWithSession, res: Response) {
  const { username, password } = req.body;
  try {
    const user = await authService.signup(username, password);
    req.session.user = user;
    res.status(201).json({ message: 'Signup successful', data: { user } });
  } catch (error: unknown) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function signin(req: RequestWithSession, res: Response) {
  const { username, password } = req.body;
  try {
    const user = await authService.signin(username, password);
    req.session.user = user;
    res.status(200).json({ message: user.message, data: user });
  } catch (error: unknown) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function signout(req: Request, res: Response) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Could not sign out.' });
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Signed out successfully' });
  });
}

export async function session(req: RequestWithSession, res: Response) {
  try {
    const data = await authService.getUserById(req.session.user!.id);
    res.status(200).json({ data });
  } catch (error: unknown) {
    res.status(401).json({ message: (error as Error).message });
  }
}

export async function deleteAccount(
  req: RequestWithSession,
  res: Response,
): Promise<void> {
  try {
    await authService.deleteAccount(req.session.user!.id);
    req.session.destroy(() => {});
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error: unknown) {
    res.status(500).json({ message: (error as Error).message });
  }
}
