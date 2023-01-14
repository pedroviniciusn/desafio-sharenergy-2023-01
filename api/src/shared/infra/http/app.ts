
import express, {
  NextFunction,
  Request,
  Response,
} from "express";

import { connect } from '../mongodb';

import dotenv from "dotenv";

import "reflect-metadata";

import 'express-async-errors';

import "../../container/index"

import { createAdmin } from '../mongodb/seed/admin';

import { router } from './routes';

import { AppError } from '../../errors/AppError';

dotenv.config();

connect();

const app = express();

app.use(express.json());

app.use(router);

createAdmin();

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

export { app };
