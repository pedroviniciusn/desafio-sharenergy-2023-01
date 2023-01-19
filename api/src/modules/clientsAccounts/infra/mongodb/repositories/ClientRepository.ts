import { IClientDTO } from '../../../dtos/IClientDTO';
import { ICreateClientDTO } from '../../../dtos/ICreateClientDTO';
import { IUpdateClientDTO } from '../../../dtos/IUpdateClientDTO';
import { IClientRepository } from '../../../repositories/IClientRepository';
import { Client } from '../models/Client';

export class ClientRepository implements IClientRepository {
  repository = Client;

  async create({
    name,
    email,
    cpf,
    address,
    phone_number,
  }: ICreateClientDTO): Promise<void> {
    const client = new Client({
      name,
      email,
      cpf,
      address,
      phone_number,
    });

    await client.save();
  }

  async update(data: IUpdateClientDTO): Promise<IClientDTO> {
    return await this.repository.findOneAndUpdate(
      {_id: data.id},
      data,
      {new: true}
    )
  }  

  async find(): Promise<IClientDTO[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<IClientDTO> {
    return await this.repository.findOne({
      _id: id
    });
  }

  async findByEmail(email: string): Promise<IClientDTO> {
    return await this.repository.findOne({
      email: email
    });
  }

  async findByName(name: string): Promise<IClientDTO> {
    return await this.repository.findOne({ name: name });
  }

  async delete(id: string): Promise<void> {
    await this.repository.findOneAndDelete({
      _id: id
    });
  }

}