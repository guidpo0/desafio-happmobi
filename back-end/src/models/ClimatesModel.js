const mysqlServer = require('../connections/mysqlServer');

const create = async ({ climateHour, climateRain, dateId }) => {
  const [{ insertId }] = await mysqlServer.execute(
    'INSERT INTO heroku_5eb1b5a5878e473.Climates (climate_hour, climate_rain, date_id) VALUES (?,?,?)',
    [climateHour, climateRain, dateId],
  );
  return { climateId: insertId };
};

const getAll = async () => {
  const [climates] = await mysqlServer.execute('SELECT * FROM heroku_5eb1b5a5878e473.Climates');
  return climates.map(
    ({
      climate_id: climateId, climate_hour: climateHour, climate_rain: climateRain, date_id: dateId,
    }) => ({
      climateId, climateHour, climateRain, dateId,
    }),
  );
};

const getById = async (id) => {
  const [climates] = await mysqlServer.execute(
    'SELECT * FROM heroku_5eb1b5a5878e473.Climates WHERE climate_id = ?', [id],
  );
  return {
    climateId: climates[0].climate_id,
    climateHour: climates[0].climate_hour,
    climateRain: climates[0].climate_rain,
    dateId: climates[0].date_id,

  };
};

module.exports = {
  create,
  getAll,
  getById,
};
