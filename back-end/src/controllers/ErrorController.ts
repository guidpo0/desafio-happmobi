import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException';
import * as HTTPCodes from '../helpers/HTTPCodes';
import { ResponseError } from '../helpers/interfaces';

const {
  UNPROCESSABLE_ENTITY_STATUS, INTERNAL_SERVER_ERROR_STATUS,
} = HTTPCodes;

export default function ErrorController(
  err: HttpException, _req: Request, res: Response, _next: NextFunction,
): Response<ResponseError> {
  if (err.isJoi) {
    const { message } = err.details[0];
    const error = { code: 'invalid_data', message };
    return res.status(UNPROCESSABLE_ENTITY_STATUS).json({ err: error });
  }
  if (err.code === 'invalid_data') {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).json({ err });
  }
  const serverError = { code: 'internal_error', message: 'Erro de servidor' };
  return res.status(INTERNAL_SERVER_ERROR_STATUS).json({ err: serverError });
}
