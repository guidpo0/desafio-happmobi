// import mysqlConnection from '../connections/mysqlServer';

// class UsersModel {
//   public async create({ dateName, districtId }) {
//     const [{ insertId }] = await mysqlConnection.execute(
//       'INSERT INTO heroku_5eb1b5a5878e473.Dates (date_name, district_id) VALUES (?,?)',
//       [dateName, districtId],
//     );
//     return { dateId: insertId };
//   }

//   public async getAll() {
//     const [dates] = await mysqlConnection.execute('SELECT * FROM heroku_5eb1b5a5878e473.Dates');
//     return dates.map(({
//       date_id: dateId,
//       date_name: dateName,
//       district_id: districtId,
//     }) => ({ dateId, dateName, districtId }));
//   }

//   public async getById(id) {
//     const [dates] = await mysqlConnection.execute(
//       'SELECT * FROM heroku_5eb1b5a5878e473.Dates WHERE date_id = ?', [id],
//     );
//     return {
//       dateId: dates[0].date_id,
//       dateName: dates[0].date_name,
//       districtId: dates[0].district_id,
//     };
//   }

//   public async remove(id) {
//     const [dates] = await mysqlConnection.execute(
//       'SELECT * FROM heroku_5eb1b5a5878e473.Dates WHERE date_id = ?', [id],
//     );
//     return {
//       dateId: dates[0].date_id,
//       dateName: dates[0].date_name,
//       districtId: dates[0].district_id,
//     };
//   }

//   public async update(id) {
//     const [dates] = await mysqlConnection.execute(
//       'SELECT * FROM heroku_5eb1b5a5878e473.Dates WHERE date_id = ?', [id],
//     );
//     return {
//       dateId: dates[0].date_id,
//       dateName: dates[0].date_name,
//       districtId: dates[0].district_id,
//     };
//   }

//   constructor() {
//     this.create = this.create.bind(this);
//     this.getAll = this.getAll.bind(this);
//     this.getById = this.getById.bind(this);
//     this.remove = this.remove.bind(this);
//     this.update = this.update.bind(this);
//   }
// }

// export default new UsersModel();
