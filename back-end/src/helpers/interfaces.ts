export interface ResponseError {
  code: string,
  message: string,
}

export interface BaseCar {
  carModel: string,
  costHour: number,
  rentAvailable?: boolean,
}

export interface Car extends BaseCar {
  carId: number,
  err?: ResponseError,
}

export interface BaseRent {
  carId: number,
  userId: number,
  rentStart: string,
  rentEnd: string,
  total?: number,
}

export interface Rent extends BaseRent {
  rentId: number,
  err?: ResponseError,
}

export interface BaseAddress {
  street: string,
  city: string,
  zip: string,
}

export interface BaseUser extends BaseAddress {
  userEmail: string,
  userPassword?: string,
  userRole?: string,
  firstName?: string,
  lastName?: string,
  phone?: string,
}

export interface User extends BaseUser {
  userId: number,
  err?: ResponseError,
}
