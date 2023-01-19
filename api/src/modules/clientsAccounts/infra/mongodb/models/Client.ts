import { model, Schema } from 'mongoose'
import { ICreateClientDTO } from "../../../dtos/ICreateClientDTO"

const clientSchema = new Schema<ICreateClientDTO>({
  name: {type: String},
  email: {type: String},
  phone_number: {type: Number},
  address: {type: String},
  cpf: {type: Number},
});

const Client = model<ICreateClientDTO>("Client", clientSchema);

export { Client };
