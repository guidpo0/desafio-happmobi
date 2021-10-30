import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export default function validateUsersData(
  req: Request, _res: Response, next: NextFunction,
):void {
  const { error } = Joi.object({
    userEmail: Joi.string().email().required(),
    userPassword: Joi.string().min(6).required(),
    userRole: Joi.string().valid('user', 'admin').required(),
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    phone: Joi.string().min(8).required(),
    street: Joi.string().min(2).required(),
    city: Joi.string().min(2).required(),
    zip: Joi.string().min(2).required(),
  }).validate(req.body);
  if (error) return next(error);
  return next();
}
