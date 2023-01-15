import { Router } from 'express';
import { CreateClientController } from '../../../../modules/clientsAccounts/useCases/createClient/CreateClientController';
import { DeleteClientController } from '../../../../modules/clientsAccounts/useCases/deleteClient/DeleteClientController';
import { UpdateClientController } from '../../../../modules/clientsAccounts/useCases/updateClient/UpdateClientController';

const clientRoutes = Router();

const createClientController = new CreateClientController();
const updateClientController = new UpdateClientController();
const deleteClientController = new DeleteClientController();

clientRoutes.post("/", createClientController.handle);
clientRoutes.put("/:id", updateClientController.handle);
clientRoutes.delete("/:id", deleteClientController.handle);

export { clientRoutes };
