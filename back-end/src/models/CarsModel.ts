import mysqlConnection from '../connections/mysqlServer';
import { BaseCar, Car } from '../helpers/interfaces';

class CarsModel {
  public async create({ carModel, costHour, rentStatus }: BaseCar): Promise<Car> {
    const [{ insertId }] = await mysqlConnection.execute(
      'INSERT INTO happmobi.Cars (car_model, cost_hour, rent_status) VALUES (?,?,?)',
      [carModel, costHour, rentStatus],
    );
    return {
      carId: insertId, carModel, costHour, rentStatus,
    };
  }

  // public async getAll() {
  //   const [dates] = await mysqlConnection.execute('SELECT * FROM heroku_5eb1b5a5878e473.Dates');
  //   return dates.map(({
  //     date_id: dateId,
  //     date_name: dateName,
  //     district_id: districtId,
  //   }) => ({ dateId, dateName, districtId }));
  // }

  // public async getById(id) {
  //   const [dates] = await mysqlConnection.execute(
  //     'SELECT * FROM heroku_5eb1b5a5878e473.Dates WHERE date_id = ?', [id],
  //   );
  //   return {
  //     dateId: dates[0].date_id,
  //     dateName: dates[0].date_name,
  //     districtId: dates[0].district_id,
  //   };
  // }

  // public async remove(id) {
  //   const [dates] = await mysqlConnection.execute(
  //     'SELECT * FROM heroku_5eb1b5a5878e473.Dates WHERE date_id = ?', [id],
  //   );
  //   return {
  //     dateId: dates[0].date_id,
  //     dateName: dates[0].date_name,
  //     districtId: dates[0].district_id,
  //   };
  // }

  // public async update(id) {
  //   const [dates] = await mysqlConnection.execute(
  //     'SELECT * FROM heroku_5eb1b5a5878e473.Dates WHERE date_id = ?', [id],
  //   );
  //   return {
  //     dateId: dates[0].date_id,
  //     dateName: dates[0].date_name,
  //     districtId: dates[0].district_id,
  //   };
  // }
}

export default new CarsModel();
