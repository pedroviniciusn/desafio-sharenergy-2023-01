import { IClientDTO } from '../dtos/IClientDTO';
import { ICreateClientDTO } from '../dtos/ICreateClientDTO';
import { IUpdateClientDTO } from '../dtos/IUpdateClientDTO';

export interface IClientRepository {
  create(data: ICreateClientDTO): Promise<void>;
  findById(id: string): Promise<IClientDTO>;
  findByEmail(email: string): Promise<IClientDTO>;
  update(data: IUpdateClientDTO): Promise<IClientDTO>;
  delete(id: string): Promise<void>;
}