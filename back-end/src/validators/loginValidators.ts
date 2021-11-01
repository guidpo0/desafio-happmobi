import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export default function validateCarsData(
  req: Request, _res: Response, next: NextFunction,
): void {
  const { error } = Joi.object({
    userEmail: Joi.string().required(),
    userPassword: Joi.string().required(),
  }).validate(req.body);
  if (error) return next(error);
  return next();
}
