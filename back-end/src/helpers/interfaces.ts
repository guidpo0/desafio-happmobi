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
