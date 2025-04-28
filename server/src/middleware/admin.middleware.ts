import { Response, NextFunction } from 'express';
import { RequestWithSession } from '../types/auth.types';

export const requireAdmin = (
  req: RequestWithSession,
  res: Response,
  next: NextFunction,
): void => {
  if (!(req.session?.user?.role === 'ADMIN')) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  next();
};
