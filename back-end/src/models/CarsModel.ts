import mysqlConnection from '../connections/mysqlServer';
import { BaseCar, Car } from '../helpers/interfaces';
import RentsModel from './RentsModel';

class CarsModel {
  private async isRentAvailable(carId: number): Promise<boolean> {
    const rents = await RentsModel.getAll();
    return rents.some(
      (rent) => {
        const rentEndMilisec: number = new Date(rent.rentEnd).getTime();
        return rent.carId === carId && rentEndMilisec > Date.now();
      },
    );
  }

  async create({ carModel, costHour }: BaseCar): Promise<Car> {
    const rentAvailable = true;
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
    carId, carModel, costHour,
  }: Car): Promise<Car> {
    const rentAvailable = await this.isRentAvailable(carId);
    await mysqlConnection.execute(
      'UPDATE happmobi.Cars SET car_model = ?, cost_hour = ?, rent_available = ? WHERE car_id = ?', [carModel, costHour, rentAvailable, carId],
    );
    const car = await this.getById(carId);
    return car;
  }

  async updateRentAvailable(carId: number, status: boolean): Promise<void> {
    await mysqlConnection.execute(
      'UPDATE happmobi.Cars SET rent_available = ? WHERE car_id = ?', [status, carId],
    );
  }
}

export default new CarsModel();
