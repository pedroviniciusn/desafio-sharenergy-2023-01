import { GetClientsController } from '@modules/clientsAccounts/useCases/getClients/GetClientsController';
import { Router } from 'express';
import { CreateClientController } from '../../../../modules/clientsAccounts/useCases/createClient/CreateClientController';
import { DeleteClientController } from '../../../../modules/clientsAccounts/useCases/deleteClient/DeleteClientController';
import { FindClientController } from '../../../../modules/clientsAccounts/useCases/findClient/FindClientController';
import { UpdateClientController } from '../../../../modules/clientsAccounts/useCases/updateClient/UpdateClientController';

const clientRoutes = Router();

const getClientsController = new GetClientsController();
const createClientController = new CreateClientController();
const findClientController =  new FindClientController();
const updateClientController = new UpdateClientController();
const deleteClientController = new DeleteClientController();

clientRoutes.get("/", getClientsController.handle)
clientRoutes.get("/:name", findClientController.handle);
clientRoutes.post("/", createClientController.handle);
clientRoutes.put("/:id", updateClientController.handle);
clientRoutes.delete("/:id", deleteClientController.handle);

export { clientRoutes };
