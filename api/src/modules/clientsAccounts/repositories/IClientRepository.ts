import { IClientDTO } from '../dtos/IClientDTO';
import { ICreateClientDTO } from '../dtos/ICreateClientDTO';

export interface IClientRepository {
  create(data: ICreateClientDTO): Promise<void>;
  findById(id: string): Promise<IClientDTO>;
  findByEmail(email: string): Promise<IClientDTO>;
  delete(id: string): Promise<void>;
}