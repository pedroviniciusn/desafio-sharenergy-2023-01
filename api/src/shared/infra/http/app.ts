import "reflect-metadata";

import * as dotenv from "dotenv";

import express, {
  NextFunction,
  Request,
  Response,
} from "express";

import { connect } from '../mongodb';

import 'express-async-errors';

import "../../container/index"

import cors from "cors";

import { createAdmin } from '../mongodb/seed/admin';

import { router } from './routes';

import { AppError } from '../../errors/AppError';

const app = express();

app.use(cors());

app.use(express.json());

app.use(router);

dotenv.config()

try {
  connect();

  createAdmin();
} catch (error) {
  console.error(error)
}

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
