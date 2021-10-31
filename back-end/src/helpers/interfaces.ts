export interface ResponseError {
  code: string,
  message: string,
}

export interface BaseCar {
  carModel: string,
  costHour: number,
  rentStatus: string,
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
  total: number,
}

export interface Rent extends BaseRent {
  rentId: number,
  err?: ResponseError,
}

export interface BaseUser {
  userEmail: string,
  userPassword: string,
  userRole: string,
  firstName: string,
  lastName: string,
  phone: string,
  street: string,
  city: string,
  zip: string,
}

export interface User extends BaseUser {
  userId: number,
  err?: ResponseError,
}
