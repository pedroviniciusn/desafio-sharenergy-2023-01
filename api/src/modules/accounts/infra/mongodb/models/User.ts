import { Schema, model } from 'mongoose';
import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';

const userSchema = new Schema<ICreateUserDTO>({
  full_name: {type: String, required: true},
  username: {type: String, required: true},
  email: {type: String, required: true},
  is_admin: {type: Boolean, default: false},
  password: {type: String, required: true},
  age: {type: Number, required: true},
});

const User = model<ICreateUserDTO>("User", userSchema);

export { User };
