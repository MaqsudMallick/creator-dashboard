import { Response } from 'express';
import * as redditService from '../services/posts.service';
import { RequestWithSession } from '../types/auth.types';

export async function feed(req: RequestWithSession, res: Response) {
  try {
    if (req.query.source === 'linkedin') {
      const feed = await redditService.fetchLinkedInArticles();
      res.status(200).json({ data: feed });
      return;
    }
    const feed = await redditService.fetchRedditPosts();
    res.status(200).json({ data: feed });
  } catch (error: unknown) {
    res.status(400).json({ message: (error as Error).message });
  }
}
