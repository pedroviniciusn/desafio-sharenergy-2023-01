import { IClientDTO } from '../../dtos/IClientDTO';
import { ICreateClientDTO } from '../../dtos/ICreateClientDTO';
import { IUpdateClientDTO } from '../../dtos/IUpdateClientDTO';
import { Client } from '../../infra/mongodb/models/Client';
import { IClientRepository } from '../IClientRepository';


export class InMemoryClientRepository implements IClientRepository {
  clients: IClientDTO[] = [];

  async create({
    name,
    email,
    address,
    cpf,
    phone_number,
    id,
  }: ICreateClientDTO): Promise<void> {
    const client = new Client();

    Object.assign(client, {
      name,
      email,
      address,
      cpf,
      phone_number,
      id,
    });

    this.clients.push(client);
  }

  async update({
    name,
    email,
    address,
    cpf,
    phone_number,
    id,
  }: IUpdateClientDTO): Promise<IClientDTO> {
    const client =  this.clients.find(client => client.id === id);

    client.name = name ? name : client.name;
    client.email = email ? email : client.email;
    client.address = address ? address : client.address;
    client.cpf = cpf ? cpf : client.cpf;
    client.phone_number = phone_number ? phone_number : client.phone_number;

    this.clients.push(client);

    return client;
  }

  async find(): Promise<IClientDTO[]> {
    return this.clients;
  }

  async findById(id: string): Promise<IClientDTO> {
    return this.clients.find(client => client.id === id);
  }

  async findByEmail(email: string): Promise<IClientDTO> {
    return this.clients.find(client => client.email === email);
  }

  async findByName(name: string): Promise<IClientDTO> {
    return this.clients.find(client => client.name === name);
  }

  async delete(id: string): Promise<void> {
    const clientIndex = this.clients.findIndex(client => client.id === id);

    if (clientIndex > -1) {
      this.clients.splice(clientIndex);
    }
  }

}