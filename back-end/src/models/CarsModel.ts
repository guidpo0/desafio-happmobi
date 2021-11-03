import mysqlConnection from '../connections/mysqlServer';
import { BaseCar, Car } from '../helpers/interfaces';
import RentsModel from './RentsModel';

class CarsModel {
  async create({ carModel, costHour }: BaseCar): Promise<Car> {
    const rentAvailable = true;
    const [{ insertId }] = await mysqlConnection.execute(
      'INSERT INTO heroku_c59813370649050.Cars (car_model, cost_hour, rent_available) VALUES (?,?,?)',
      [carModel, costHour, rentAvailable],
    );
    return {
      carId: insertId, carModel, costHour, rentAvailable,
    };
  }

  async getAll(): Promise<Car[]> {
    const [cars] = await mysqlConnection.execute(
      'SELECT * FROM heroku_c59813370649050.Cars',
    );
    return cars.map(({
      car_id: carId,
      car_model: carModel,
      cost_hour: costHour,
      rent_available: rentAvailable,
    }) => ({
      carId, carModel, costHour, rentAvailable: rentAvailable === 1,
    }));
  }

  async getById(id: number): Promise<Car> {
    const [car] = await mysqlConnection.execute(
      'SELECT * FROM heroku_c59813370649050.Cars WHERE car_id = ?', [id],
    );
    if (!car[0]) return null;
    return {
      carId: car[0].car_id,
      carModel: car[0].car_model,
      costHour: car[0].cost_hour,
      rentAvailable: car[0].rent_available === 1,
    };
  }

  async remove(id: number): Promise<Car> {
    const car = await this.getById(id);
    await mysqlConnection.execute(
      'DELETE FROM heroku_c59813370649050.Cars WHERE car_id = ?', [id],
    );
    return car;
  }

  async update({
    carId, carModel, costHour,
  }: Car): Promise<Car> {
    await mysqlConnection.execute(
      'UPDATE heroku_c59813370649050.Cars SET car_model = ?, cost_hour = ?, rent_available = ? WHERE car_id = ?', [carModel, costHour, true, carId],
    );
    const car = await this.getById(carId);
    return car;
  }

  async updateRentAvailable(carId: number, status: boolean): Promise<void> {
    await mysqlConnection.execute(
      'UPDATE heroku_c59813370649050.Cars SET rent_available = ? WHERE car_id = ?', [status, carId],
    );
  }
}

export default new CarsModel();
