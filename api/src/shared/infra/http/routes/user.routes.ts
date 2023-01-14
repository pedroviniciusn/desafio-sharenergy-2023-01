import { Router } from 'express';
import { ListUsersController } from '../../../../modules/accounts/useCases/listUsers/ListUsersController';

const userRoutes = Router();

const listUsersController = new ListUsersController();

userRoutes.get("/:page", listUsersController.handle);

export { userRoutes };
