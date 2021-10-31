import CarsModel from '../models/CarsModel';
import { BaseCar, Car, ResponseError } from '../helpers/interfaces';
import { CAR_NOT_FOUND_ERROR } from '../helpers/errorsCodes';

class CarsService {
  async create({ carModel, costHour, rentStatus }: BaseCar): Promise<Car> {
    return CarsModel.create({ carModel, costHour, rentStatus });
  }

  async getAll(): Promise<Car[]> {
    return CarsModel.getAll();
  }

  async getById(carId: number): Promise<Car | { err: ResponseError }> {
    const car = await CarsModel.getById(carId);
    if (!car) {
      return CAR_NOT_FOUND_ERROR;
    }
    return car;
  }

  async remove(carId: number): Promise<Car | { err: ResponseError }> {
    const removedCar = await CarsModel.remove(carId);
    if (!removedCar) {
      return CAR_NOT_FOUND_ERROR;
    }
    return removedCar;
  }

  async update({
    carId, carModel, costHour, rentStatus,
  }: Car): Promise<Car | { err: ResponseError }> {
    const updatedCar = await CarsModel.update({
      carId, carModel, costHour, rentStatus,
    });
    if (!updatedCar) {
      return CAR_NOT_FOUND_ERROR;
    }
    return updatedCar;
  }
}

export default new CarsService();
