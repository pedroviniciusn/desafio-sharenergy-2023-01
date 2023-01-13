import express, {
  NextFunction,
  Request,
  Response,
  Router,
} from "express";

import { connect } from '../mongodb';

import 'express-async-errors';

import dotenv from "dotenv";

import "../../container";

import { User } from '../mongodb/seed/admin';

import { createAdmin } from '../mongodb/seed/admin';

import { AppError } from '../../errors/AppError';

dotenv.config();

connect();

const app = express();

app.use(express.json());

// app.get("/", async (req, res) => {
//   const adminExists = await User.findOne({
//     _email: 
//   })

//   if(!adminExists) {
//     createAdmin()
//   }

//   const user = await User.find();

//   return res.json(user);
// })

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: `Internal server error ${err.message}`,
  });
});

export { app }