import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import * as feedController from '../controllers/feed.controller'

const router = Router();
router.use(requireAuth);
router.get('/', feedController.feed);
export default router;
