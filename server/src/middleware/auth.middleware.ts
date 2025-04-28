import { Response, NextFunction } from 'express';
import { RequestWithSession } from '../types/auth.types';

export const requireAuth = (
  req: RequestWithSession,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.session?.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  next();
};
