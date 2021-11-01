import mysqlConnection from '../connections/mysqlServer';
import { BaseCar, Car } from '../helpers/interfaces';

class CarsModel {
  async create({ carModel, costHour, rentAvailable }: BaseCar): Promise<Car> {
    const [{ insertId }] = await mysqlConnection.execute(
      'INSERT INTO happmobi.Cars (car_model, cost_hour, rent_available) VALUES (?,?,?)',
      [carModel, costHour, rentAvailable],
    );
    return {
      carId: insertId, carModel, costHour, rentAvailable,
    };
  }

  async getAll(): Promise<Car[]> {
    const [cars] = await mysqlConnection.execute(
      'SELECT * FROM happmobi.Cars',
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
      'SELECT * FROM happmobi.Cars WHERE car_id = ?', [id],
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
      'DELETE FROM happmobi.Cars WHERE car_id = ?', [id],
    );
    return car;
  }

  async update({
    carId, carModel, costHour, rentAvailable,
  }: Car): Promise<Car> {
    await mysqlConnection.execute(
      'UPDATE happmobi.Cars SET car_model = ?, cost_hour = ?, rent_available = ? WHERE car_id = ?', [carModel, costHour, rentAvailable, carId],
    );
    const car = await this.getById(carId);
    return car;
  }
}

export default new CarsModel();
