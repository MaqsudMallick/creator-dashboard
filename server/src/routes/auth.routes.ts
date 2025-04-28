import { Router } from 'express';
import { validateRequest } from '../middleware/validate.middleware';
import { SigninDto, SignupDto } from '../models/auto.dto';
import * as authController from '../controllers/auth.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

router.post('/signup', validateRequest(SignupDto), authController.signup);
router.post('/signin', validateRequest(SigninDto), authController.signin);
router.use(requireAuth);
router.post('/signout', authController.signout);
router.get('/me', authController.session);
router.delete('/', authController.deleteAccount);

export default router;
