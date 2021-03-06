import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export default function validateCarsData(
  req: Request, _res: Response, next: NextFunction,
): void {
  const { error } = Joi.object({
    carModel: Joi.string().required(),
    costHour: Joi.number().min(0).required(),
    rentAvailable: Joi.boolean().required(),
  }).validate(req.body);
  if (error) return next(error);
  return next();
}
