import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException';
import * as HTTPCodes from '../helpers/HTTPCodes';
import { ResponseError } from '../helpers/interfaces';
import { INVALID_DATA_ERROR, INTERNAL_SERVER_ERROR } from '../helpers/errorsCodes';

const {
  UNPROCESSABLE_ENTITY_STATUS, INTERNAL_SERVER_ERROR_STATUS,
} = HTTPCodes;

export default function ErrorController(
  err: HttpException, _req: Request, res: Response, _next: NextFunction,
): Response<ResponseError> {
  if (err.isJoi) {
    const { message } = err.details[0];
    return res.status(UNPROCESSABLE_ENTITY_STATUS).json(INVALID_DATA_ERROR(message));
  }
  if (['rent_end_date', 'car_not_available', 'not_found'].includes(err.code)) {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).json({ err });
  }
  return res.status(INTERNAL_SERVER_ERROR_STATUS).json({ err: INTERNAL_SERVER_ERROR });
}
