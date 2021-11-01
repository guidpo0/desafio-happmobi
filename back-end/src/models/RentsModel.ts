import mysqlConnection from '../connections/mysqlServer';
import { BaseRent, Rent } from '../helpers/interfaces';
import CarsModel from './CarsModel';

class RentsModel {
  private async deleteEventUpdateCarAvailable(
    rentId: number,
  ): Promise<void> {
    const query = `DROP EVENT update_car_available${rentId}`;
    await mysqlConnection.query(query);
  }

  private async createOrUpdateEventUpdateCarAvailable(
    rentId:number, rentEnd: string, carId: number, eventAction: string,
  ): Promise<void> {
    const query = `${eventAction} EVENT update_car_available${rentId} ON SCHEDULE AT '${rentEnd}' DO UPDATE happmobi.Cars SET rent_available = ${true} WHERE car_id = ${carId}`;
    await mysqlConnection.query(query);
  }

  private async calculateTotal(
    carId: number, rentStart: string, rentEnd: string,
  ): Promise<number> {
    const [result] = await mysqlConnection.execute(
      'SELECT cost_hour FROM happmobi.Cars WHERE car_id = ?',
      [carId],
    );
    const { cost_hour: costHour } = result[0];
    const timeDifHour: number = (
      (new Date(rentEnd).getTime() - new Date(rentStart).getTime()) / (1000 * 60 * 60)
    );
    return timeDifHour * costHour;
  }

  async create({
    carId, userId, rentStart, rentEnd,
  }: BaseRent): Promise<Rent> {
    await CarsModel.updateRentAvailable(carId, false);
    const total = await this.calculateTotal(carId, rentStart, rentEnd);
    const [{ insertId }] = await mysqlConnection.execute(
      'INSERT INTO happmobi.Rents (car_id, user_id, rent_start, rent_end, total) VALUES (?,?,?,?,?)',
      [carId, userId, rentStart, rentEnd, total],
    );
    await this.createOrUpdateEventUpdateCarAvailable(insertId, rentEnd, carId, 'CREATE');
    const rent = await this.getById(insertId);
    return rent;
  }

  async getAll(): Promise<Rent[]> {
    const [rents] = await mysqlConnection.execute(
      'SELECT * FROM happmobi.Rents',
    );
    return rents.map(({
      rent_id: rentId,
      car_id: carId,
      user_id: userId,
      rent_start: rentStart,
      rent_end: rentEnd,
      total,
    }) => ({
      rentId, carId, userId, rentStart, rentEnd, total,
    }));
  }

  async getById(id: number): Promise<Rent> {
    const [rent] = await mysqlConnection.execute(
      'SELECT * FROM happmobi.Rents WHERE rent_id = ?', [id],
    );
    if (!rent[0]) return null;
    return {
      rentId: rent[0].rent_id,
      carId: rent[0].car_id,
      userId: rent[0].user_id,
      rentStart: rent[0].rent_start,
      rentEnd: rent[0].rent_end,
      total: rent[0].total,
    };
  }

  async remove(id: number): Promise<Rent> {
    const rent = await this.getById(id);
    await CarsModel.updateRentAvailable(rent.carId, true);
    await this.deleteEventUpdateCarAvailable(id);
    await mysqlConnection.execute(
      'DELETE FROM happmobi.Rents WHERE rent_id = ?', [id],
    );
    return rent;
  }

  async update({
    rentId, carId, userId, rentStart, rentEnd,
  }: Rent): Promise<Rent> {
    const total = await this.calculateTotal(carId, rentStart, rentEnd);
    const { rentEnd: oldRentEnd, carId: oldCarId } = await this.getById(rentId);
    const oldRentEndTime = new Date(oldRentEnd).getTime() + 3 * 60 * 60 * 1000;
    if (Date.now() > oldRentEndTime) {
      await CarsModel.updateRentAvailable(carId, false);
      await this.createOrUpdateEventUpdateCarAvailable(rentId, rentEnd, carId, 'CREATE');
    } else {
      await this.createOrUpdateEventUpdateCarAvailable(rentId, rentEnd, carId, 'ALTER');
    }
    if (oldCarId !== carId) {
      await CarsModel.updateRentAvailable(oldCarId, true);
      await CarsModel.updateRentAvailable(carId, false);
    }
    await mysqlConnection.execute(
      'UPDATE happmobi.Rents SET car_id = ?, user_id = ?, rent_start = ?, rent_end = ?, total = ? WHERE rent_id = ?',
      [carId, userId, rentStart, rentEnd, total, rentId],
    );
    const rent = await this.getById(rentId);
    return rent;
  }
}

export default new RentsModel();
