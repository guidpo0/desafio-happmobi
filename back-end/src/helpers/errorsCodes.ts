import { ResponseError } from './interfaces';

export const CAR_NOT_FOUND_ERROR = {
  err: {
    code: 'not_found',
    message: 'Car not found',
  },
};

export const RENT_NOT_FOUND_ERROR = {
  err: {
    code: 'not_found',
    message: 'Rent not found',
  },
};

export const USER_NOT_FOUND_ERROR = {
  err: {
    code: 'not_found',
    message: 'User not found',
  },
};

export const INTERNAL_SERVER_ERROR = {
  err: {
    code: 'internal_error',
    message: 'Internal server error',
  },
};

export const INVALID_DATA_ERROR = (message: string): { err: ResponseError } => ({
  err: {
    code: 'invalid_data',
    message,
  },
});

export const CAR_NOT_AVAILABLE_ERROR = {
  err: {
    code: 'car_not_available',
    message: 'Car not available',
  },
};

export const RENT_END_DATE_ERROR = {
  err: {
    code: 'rent_end_date',
    message: 'Rental end date cannot be less than now',
  },
};

export const LOGIN_ERROR = {
  err: {
    code: 'login_error',
    message: 'User email or password incorrects',
  },
};

export const INVALID_TOKEN_ERROR = {
  err: {
    code: 'invalid_token',
    message: 'Invalid token or no token provided',
  },
};
