import mysqlConnection from '../connections/mysqlServer';
import { BaseCar, Car } from '../helpers/interfaces';

class CarsModel {
  async create({ carModel, costHour, rentStatus }: BaseCar): Promise<Car> {
    const [{ insertId }] = await mysqlConnection.execute(
      'INSERT INTO happmobi.Cars (car_model, cost_hour, rent_status) VALUES (?,?,?)',
      [carModel, costHour, rentStatus],
    );
    return {
      carId: insertId, carModel, costHour, rentStatus,
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
      rent_status: rentStatus,
    }) => ({
      carId, carModel, costHour, rentStatus,
    }));
  }

  async getById(id: number): Promise<Car> {
    const [car] = await mysqlConnection.execute(
      'SELECT * FROM happmobi.Cars WHERE car_id = ?', [id],
    );
    return {
      carId: car[0].car_id,
      carModel: car[0].car_model,
      costHour: car[0].cost_hour,
      rentStatus: car[0].rent_status,
    };
  }

  async remove(id: number): Promise<Car> {
    const car = await this.getById(id);
    await mysqlConnection.execute(
      'DELETE FROM happmobi.Cars WHERE car_id = ?', [id],
    );
    return car;
  }

  public async update({
    carId, carModel, costHour, rentStatus,
  }: Car): Promise<Car> {
    await mysqlConnection.execute(
      'UPDATE happmobi.Cars SET car_model = ?, cost_hour = ?, rent_status = ? WHERE car_id = ?', [carModel, costHour, rentStatus, carId],
    );
    const car = await this.getById(carId);
    return car;
  }
}

export default new CarsModel();
