import {
  NextFunction,
  Request,
  Response
} from "express";

import { verify } from "jsonwebtoken";

import {
  UserRepository,
} from "../../../../modules/accounts/infra/mongodb/repositories/UserRepository";

import {
  AppError,
} from "../../../errors/AppError";

interface IPayload {
  subject: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    throw new AppError("token missing", 401)
  }

  const [, token] = authHeader.split(" ");
  const { subject: user_id } = verify(token, "56ebb4604b372d83bb869862c65c9fbd") as IPayload;
   
  const userRepository = new UserRepository();

  const user = await userRepository.findById(user_id);
  if (!user) {
    throw new AppError("User not found", 401);
  }
  try {




    req.user = {
      id: user_id
    };

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}