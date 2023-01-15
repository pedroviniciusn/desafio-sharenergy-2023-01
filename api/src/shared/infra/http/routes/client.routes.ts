import { Router } from 'express';
import { CreateClientController } from '../../../../modules/clientsAccounts/useCases/createClient/CreateClientController';
import { DeleteClientController } from '../../../../modules/clientsAccounts/useCases/deleteClient/DeleteClientController';

const clientRoutes = Router();

const createClientController = new CreateClientController();
const deleteClientController = new DeleteClientController();

clientRoutes.post("/", createClientController.handle);
clientRoutes.delete("/:id", deleteClientController.handle);

export { clientRoutes };
