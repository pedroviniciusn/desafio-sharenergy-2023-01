import { Router } from 'express';
import { FindUserController } from '../../../../modules/users/useCases/findUser/FindUserController';
import { ListUsersController } from '../../../../modules/users/useCases/listUsers/ListUsersController';

const userRoutes = Router();

const listUsersController = new ListUsersController();
const findUserController =  new FindUserController();

userRoutes.get("/:page", listUsersController.handle);
userRoutes.post("/", findUserController.handle);

export { userRoutes };
