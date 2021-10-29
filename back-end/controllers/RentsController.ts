const RentsService = require('../services/RentsService.ts');
const { CREATED_STATUS, OK_STATUS } = require('../helpers/HTTPCodes.ts');

const create = async (req, res, next) => {
  const {
    carId, userId, rentStart, rentEnd, total,
  } = req.body;
  const { rentId, err } = await RentsService.create({
    carId, userId, rentStart, rentEnd, total,
  });
  if (err) return next(err);
  return res.status(CREATED_STATUS).json({
    rentId, carId, userId, rentStart, rentEnd, total,
  });
};

const getAll = async (req, res) => {
  const rents = await RentsService.getAll();
  return res.status(OK_STATUS).json({ rents });
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const rent = await RentsService.getById(id);
  const { err } = rent;
  if (err) return next(err);
  return res.status(OK_STATUS).json(rent);
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  const rentRemoved = await RentsService.remove(id);
  const { err } = rentRemoved;
  if (err) return next(err);
  return res.status(OK_STATUS).json(rentRemoved);
};

const update = async (req, res, next) => {
  const {
    carId, userId, rentStart, rentEnd, total,
  } = req.body;
  const { id } = req.params;
  const { rentId, err } = await RentsService.update({
    rentId: id, carId, userId, rentStart, rentEnd, total,
  });
  if (err) return next(err);
  return res.status(OK_STATUS).json({
    rentId, carId, userId, rentStart, rentEnd, total,
  });
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,
};
