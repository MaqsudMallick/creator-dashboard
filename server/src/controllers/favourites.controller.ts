import { Response } from 'express';
import * as favouritesService from '../services/favourites.service';
import { Error, RequestWithSession } from '../types/auth.types';
import { AddFavouriteDto } from '../models/favourites.dto';
import { plainToInstance } from 'class-transformer';

export async function getFavourites(req: RequestWithSession, res: Response) {
  try {
    const userId = req.session.user?.id;
    const data = await favouritesService.getFavourites(userId!);
    res.status(200).json({ data });
  } catch (error: unknown) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function addFavourites(req: RequestWithSession, res: Response) {
  try {
    const post = plainToInstance(AddFavouriteDto, req.body);
    const userId = req.session.user?.id;
    const data = await favouritesService.addFavourites(post, userId!);
    res.status(201).json({ data });
  } catch (error: unknown) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function deleteFavourites(req: RequestWithSession, res: Response) {
  try {
    const id = req.params.id;
    const userId = req.session.user?.id;
    const data = await favouritesService.deleteFavourites(id, userId!);
    res.status(200).json({ data });
  } catch (error: unknown) {
    res.status(400).json({ message: (error as Error).message });
  }
}
