import CarsModel from '../models/CarsModel';
import { BaseCar, Car, ResponseError } from '../helpers/interfaces';
import { CAR_NOT_FOUND_ERROR, CAR_NOT_AVAILABLE_ERROR } from '../helpers/errorsCodes';

class CarsService {
  async create({ carModel, costHour }: BaseCar): Promise<Car> {
    return CarsModel.create({ carModel, costHour });
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
    const car = await CarsModel.getById(carId);
    if (!car) {
      return CAR_NOT_FOUND_ERROR;
    }
    if (!car.rentAvailable) {
      return CAR_NOT_AVAILABLE_ERROR;
    }
    const removedCar = await CarsModel.remove(carId);
    return removedCar;
  }

  async update({
    carId, carModel, costHour,
  }: Car): Promise<Car | { err: ResponseError }> {
    const car = await CarsModel.getById(carId);
    if (!car) {
      return CAR_NOT_FOUND_ERROR;
    }
    if (!car.rentAvailable) {
      return CAR_NOT_AVAILABLE_ERROR;
    }
    const updatedCar = await CarsModel.update({
      carId, carModel, costHour,
    });
    return updatedCar;
  }
}

export default new CarsService();
