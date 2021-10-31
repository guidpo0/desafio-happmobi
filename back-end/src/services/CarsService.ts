import CarsModel from '../models/CarsModel';
import { BaseCar, Car } from '../helpers/interfaces';

class CarsService {
  async create({ carModel, costHour, rentStatus }: BaseCar): Promise<Car> {
    return CarsModel.create({ carModel, costHour, rentStatus });
  }

  // public async getAll() {
  //   return CarsModel.getAll();
  // }

  // public async getById(id) {
  //   const car = await CarsModel.getById(id);
  //   if (!car) {
  //     return {
  //       err: {
  //         code: 'invalid_data',
  //         message: 'Car not found',
  //       },
  //     };
  //   }
  //   return car;
  // }

  // public async remove({ climateHour, climateRain, dateId }): Promise<> {
  //   return CarsModel.create({ climateHour, climateRain, dateId });
  // }

  // public async update({ climateHour, climateRain, dateId }): Promise<> {
  //   return CarsModel.create({ climateHour, climateRain, dateId });
  // }
}

export default new CarsService();
