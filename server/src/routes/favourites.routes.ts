import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import * as favouritesController from '../controllers/favourites.controller'

const router = Router();
router.use(requireAuth);
router.get('/', favouritesController.getFavourites);
router.post('/', favouritesController.addFavourites);
router.delete('/:id', favouritesController.deleteFavourites);
export default router;
