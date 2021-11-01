import { ValidationError } from 'joi';

class HttpException extends ValidationError {
  code: string;

  constructor(codeMessage = 'internal_error', ...params) {
    super(...params);

    this.code = codeMessage;
  }
}

export default HttpException;
