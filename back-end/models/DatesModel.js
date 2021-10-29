const mysqlServer = require('../connections/mysqlServer');

const create = async ({ dateName, districtId }) => {
  const [{ insertId }] = await mysqlServer.execute(
    'INSERT INTO heroku_5eb1b5a5878e473.Dates (date_name, district_id) VALUES (?,?)',
    [dateName, districtId],
  );
  return { dateId: insertId };
};

const getAll = async () => {
  const [dates] = await mysqlServer.execute('SELECT * FROM heroku_5eb1b5a5878e473.Dates');
  return dates.map(({
    date_id: dateId,
    date_name: dateName,
    district_id: districtId,
  }) => ({ dateId, dateName, districtId }));
};

const getById = async (id) => {
  const [dates] = await mysqlServer.execute(
    'SELECT * FROM heroku_5eb1b5a5878e473.Dates WHERE date_id = ?', [id],
  );
  return {
    dateId: dates[0].date_id,
    dateName: dates[0].date_name,
    districtId: dates[0].district_id,
  };
};

module.exports = {
  create,
  getAll,
  getById,
};
