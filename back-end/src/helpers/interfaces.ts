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
