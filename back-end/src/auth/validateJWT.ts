import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import UsersModel from '../models/UsersModel';
import { UNAUTHORIZED_STATUS } from '../helpers/HTTPCodes';
import { INVALID_TOKEN_ERROR } from '../helpers/errorsCodes';

dotenv.config();

export default async function validateJWT(
  req: Request, res: Response, next: NextFunction,
): Promise<Response | void> {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(UNAUTHORIZED_STATUS).json(INVALID_TOKEN_ERROR);
  }
  const secret = process.env.JWT_SECRET;
  const decoded = jwt.verify(token, secret);
  const user = await UsersModel.getById(decoded.data.userId);
  if (!user) return res.status(UNAUTHORIZED_STATUS).json(INVALID_TOKEN_ERROR);
  delete user.userPassword;
  req.user = user;
  return next();
}
