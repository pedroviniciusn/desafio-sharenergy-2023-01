import { model, Schema } from 'mongoose'
import { ICreateClientDTO } from "../../../dtos/ICreateClientDTO"

const clientSchema = new Schema<ICreateClientDTO>({
  name: {type: String, required: true},
  email: {type: String, required: true},
  phone_number: {type: Number, required: true},
  address: {type: String, required: true},
  cpf: {type: Number, required: true},
});

const Client = model<ICreateClientDTO>("Client", clientSchema);

export { Client };
