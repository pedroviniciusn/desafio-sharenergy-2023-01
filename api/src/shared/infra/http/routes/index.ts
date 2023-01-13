import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { authenticateRoutes } from './authenticate.routes';
import { userRoutes } from './user.routes';

const router = Router();

router.use("/session", authenticateRoutes);
router.use("/users", ensureAuthenticated, userRoutes);

export { router };
