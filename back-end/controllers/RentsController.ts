const DatesService = require('../services/DatesService');
const { OK_STATUS } = require('../helpers/HTTPCodes');

const create = async (req, res, next) => {
  const { dateName, districtId } = req.body;
  const { dateId, err } = await DatesService.create({ dateName, districtId });
  if (err) return next(err);
  return res.status(OK_STATUS).json({ dateId, dateName, districtId });
};

const getAll = async (_req, res) => {
  const dates = await DatesService.getAll();
  return res.status(OK_STATUS).json({ dates });
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const date = await DatesService.getById(id);
  const { err } = date;
  if (err) return next(err);
  return res.status(OK_STATUS).json(date);
};

module.exports = {
  create,
  getAll,
  getById,
};
