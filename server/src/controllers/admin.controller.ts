import { Response } from 'express';
import { Error, RequestWithSession } from '../types/auth.types';
import * as adminService from '../services/admin.service';
import { plainToInstance } from 'class-transformer';
import { UpdateCreditsDto } from '../models/admin.dto';
import * as authService from '../services/auth.service';

export async function getUsers(req: RequestWithSession, res: Response) {
  try {
    const data = await adminService.getUsers();
    res.status(200).json({ data });
  } catch (error: unknown) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function getUser(req: RequestWithSession, res: Response) {
  try {
    if (!req.params.id) {
      res.status(400).json({ message: 'User id param is required' });
      return;
    }
    const data = await authService.getUserById(req.params.id);
    res.status(200).json({ data });
  } catch (error: unknown) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function getFavourites(req: RequestWithSession, res: Response) {
  try {
    const userId = req.params.userId;
    if (!userId) {
      res.status(400).json({ message: 'User id param is required' });
    }
    const data = await adminService.getFavourites(userId);
    res.status(200).json({ data });
  } catch (error: unknown) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function updateCredits(req: RequestWithSession, res: Response) {
  try {
    const updateCreditsDto = plainToInstance(UpdateCreditsDto, req.body);
    const data = await adminService.updateCredits(
      updateCreditsDto.userId,
      updateCreditsDto.credits,
    );
    res.status(200).json({ data });
  } catch (error: unknown) {
    res.status(400).json({ message: (error as Error).message });
  }
}
