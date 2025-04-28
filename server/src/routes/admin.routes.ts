import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import { requireAdmin } from '../middleware/admin.middleware';
import * as adminController from '../controllers/admin.controller';
import { validateRequest } from '../middleware/validate.middleware';
import { UpdateCreditsDto } from '../models/admin.dto';

const router = Router();

router.use(requireAuth);
router.use(requireAdmin);
router.get('/users', adminController.getUsers);
router.get('/user/:id', adminController.getUser);
router.get('/favourites/:userId', adminController.getFavourites);
router.put(
  '/update-credits',
  validateRequest(UpdateCreditsDto),
  adminController.updateCredits,
);

export default router;
