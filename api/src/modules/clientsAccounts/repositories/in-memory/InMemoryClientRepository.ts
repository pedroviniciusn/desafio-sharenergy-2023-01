import { IClientDTO } from '../../dtos/IClientDTO';
import { ICreateClientDTO } from '../../dtos/ICreateClientDTO';
import { IUpdateClientDTO } from '../../dtos/IUpdateClientDTO';
import { Client } from '../../infra/mongodb/models/Client';
import { IClientRepository } from '../IClientRepository';


export class InMemoryClientRepository implements IClientRepository {
  client: IClientDTO[] = [];

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

    this.client.push(client);
  }

  async update({
    name,
    email,
    address,
    cpf,
    phone_number,
    id,
  }: IUpdateClientDTO): Promise<IClientDTO> {
    const client =  this.client.find(client => client.id === id);

    Object.assign(client, {
      name,
      email,
      address,
      cpf,
      phone_number,
    });

    this.client.push(client);

    return client;
  }

  async findById(id: string): Promise<IClientDTO[]> {
    return this.client.filter(client => client.id === id);
  }

  async findByEmail(email: string): Promise<IClientDTO[]> {
    return this.client.filter(client => client.email === email);
  }

  async findByName(name: string): Promise<IClientDTO[]> {
    return this.client.filter(client => client.name === name);
  }

  async delete(id: string): Promise<void> {
    const clientIndex = this.client.findIndex(client => client.id === id);

    if (clientIndex > -1) {
      this.client.splice(clientIndex);
    }
  }

}