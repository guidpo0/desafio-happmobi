import mysqlConnection from '../connections/mysqlServer';
import { BaseRent, Rent } from '../helpers/interfaces';

class RentsModel {
  async create({
    carId, userId, rentStart, rentEnd, total,
  }: BaseRent): Promise<Rent> {
    const [{ insertId }] = await mysqlConnection.execute(
      'INSERT INTO happmobi.Rents (car_id, user_id, rent_start, rent_end, total) VALUES (?,?,?,?,?)',
      [carId, userId, rentStart, rentEnd, total],
    );
    return {
      rentId: insertId, carId, userId, rentStart, rentEnd, total,
    };
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
    await mysqlConnection.execute(
      'DELETE FROM happmobi.Rents WHERE rent_id = ?', [id],
    );
    return rent;
  }

  public async update({
    rentId, carId, userId, rentStart, rentEnd, total,
  }: Rent): Promise<Rent> {
    const rent = await this.getById(rentId);
    await mysqlConnection.execute(
      'UPDATE happmobi.Rents SET car_id = ?, user_id = ?, rent_start = ?, rent_end = ?, total = ? WHERE rent_id = ?',
      [carId, userId, rentStart, rentEnd, total, rentId],
    );
    return rent;
  }
}

export default new RentsModel();
