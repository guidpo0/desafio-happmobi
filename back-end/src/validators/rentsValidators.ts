import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import JoiDate from '@joi/date';

Joi.extend(JoiDate);

export default function validateRentsData(
  req: Request, _res: Response, next: NextFunction,
): void {
  const { error } = Joi.object({
    carId: Joi.number().integer().min(1).required(),
    userId: Joi.number().integer().min(1).required(),
    rentStart: Joi.date().required(),
    rentEnd: Joi.date().required(),
    total: Joi.number().min(0).required(),
  }).validate(req.body);
  if (error) return next(error);
  return next();
}
