import RentsModel from '../models/RentsModel';
import CarsModel from '../models/CarsModel';
import UsersModel from '../models/UsersModel';
import { BaseRent, Rent, ResponseError } from '../helpers/interfaces';
import {
  RENT_NOT_FOUND_ERROR,
  CAR_NOT_FOUND_ERROR,
  USER_NOT_FOUND_ERROR,
  CAR_NOT_AVAILABLE_ERROR,
  RENT_END_DATE_ERROR,
  RENT_START_DATE_ERROR,
  RENT_DATE_ERROR,
} from '../helpers/errorsCodes';

class RentsService {
  async create({
    carId, userId, rentStart, rentEnd,
  }: BaseRent): Promise<Rent | { err: ResponseError }> {
    const rentEndTime = new Date(rentEnd).getTime();
    if (rentEndTime < Date.now()) return RENT_END_DATE_ERROR;
    const rentStartTime = new Date(rentStart).getTime();
    if (rentStartTime < Date.now()) return RENT_START_DATE_ERROR;
    if (rentEndTime < rentStartTime) return RENT_DATE_ERROR;
    const car = await CarsModel.getById(carId);
    if (!car) return CAR_NOT_FOUND_ERROR;
    if (!car.rentAvailable) return CAR_NOT_AVAILABLE_ERROR;
    const user = await UsersModel.getById(userId);
    if (!user) return USER_NOT_FOUND_ERROR;
    return RentsModel.create({
      carId, userId, rentStart, rentEnd,
    });
  }

  async getAll(): Promise<Rent[]> {
    return RentsModel.getAll();
  }

  async getById(rentId: number): Promise<Rent | { err: ResponseError }> {
    const rent = await RentsModel.getById(rentId);
    if (!rent) {
      return RENT_NOT_FOUND_ERROR;
    }
    return rent;
  }

  async remove(rentId: number): Promise<Rent | { err: ResponseError }> {
    const removedRent = await RentsModel.remove(rentId);
    if (!removedRent) {
      return RENT_NOT_FOUND_ERROR;
    }
    return removedRent;
  }

  async update({
    rentId, carId, userId, rentStart, rentEnd,
  }: Rent): Promise<Rent | { err: ResponseError }> {
    const rentEndTime = new Date(rentEnd).getTime();
    if (rentEndTime < Date.now()) return RENT_END_DATE_ERROR;
    const car = await CarsModel.getById(carId);
    if (!car) return CAR_NOT_FOUND_ERROR;
    if (!car.rentAvailable) return CAR_NOT_AVAILABLE_ERROR;
    const user = await UsersModel.getById(userId);
    if (!user) return USER_NOT_FOUND_ERROR;
    const updatedRent = await RentsModel.update({
      rentId, carId, userId, rentStart, rentEnd,
    });
    if (!updatedRent) {
      return RENT_NOT_FOUND_ERROR;
    }
    return updatedRent;
  }
}

export default new RentsService();
