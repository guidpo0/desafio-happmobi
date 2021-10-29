const DistrictsService = require('../services/DistrictsService');
const { OK_STATUS } = require('../helpers/HTTPCodes');

const create = async (req, res, next) => {
  const { districtName, state } = req.body;
  const { districtId, err } = await DistrictsService.create({ districtName, state });
  if (err) return next(err);
  return res.status(OK_STATUS).json({ districtId, districtName, state });
};

const getAll = async (_req, res) => {
  const districts = await DistrictsService.getAll();
  return res.status(OK_STATUS).json({ districts });
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const district = await DistrictsService.getById(id);
  const { err } = district;
  if (err) return next(err);
  return res.status(OK_STATUS).json(district);
};

module.exports = {
  create,
  getAll,
  getById,
};
