import { IClientDTO } from '../dtos/IClientDTO';
import { ICreateClientDTO } from '../dtos/ICreateClientDTO';
import { IUpdateClientDTO } from '../dtos/IUpdateClientDTO';

export interface IClientRepository {
  create(data: ICreateClientDTO): Promise<void>;
  findById(id: string): Promise<IClientDTO | null>;
  findByEmail(email: string): Promise<IClientDTO | null>;
  findByName(name: string): Promise<IClientDTO | null>;
  update(data: IUpdateClientDTO): Promise<IClientDTO>;
  delete(id: string): Promise<void>;
}