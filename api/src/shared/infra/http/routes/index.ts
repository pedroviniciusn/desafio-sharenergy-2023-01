import { Router } from 'express';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { authenticateRoutes } from './authenticate.routes';
import { clientRoutes } from './client.routes';
import { userRoutes } from './user.routes';

const router = Router();

router.use("/session", authenticateRoutes);
router.use("/users", ensureAuthenticated, ensureAdmin, userRoutes);
router.use("/clients", ensureAuthenticated, ensureAdmin, clientRoutes);

export { router };
