const mysqlServer = require('../connections/mysqlServer');

const create = async ({ districtName, state }) => {
  const [{ insertId }] = await mysqlServer.execute(
    'INSERT INTO heroku_5eb1b5a5878e473.Districts (district_name, state) VALUES (?,?)',
    [districtName, state],
  );
  return { districtId: insertId };
};

const getAll = async () => {
  const [districts] = await mysqlServer.execute('SELECT * FROM heroku_5eb1b5a5878e473.Districts');
  return districts.map(
    ({
      district_id: districtId, district_name: districtName, state,
    }) => ({ districtId, districtName, state }),
  );
};

const getById = async (id) => {
  const [districts] = await mysqlServer.execute(
    'SELECT * FROM heroku_5eb1b5a5878e473.Districts WHERE district_id = ?', [id],
  );
  return {
    districtId: districts[0].district_id,
    districtName: districts[0].district_name,
    state: districts[0].state,
  };
};

module.exports = {
  create,
  getAll,
  getById,
};
