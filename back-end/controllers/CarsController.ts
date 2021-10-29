const CarsService = require('../services/CarsService.ts');
const { CREATED_STATUS, OK_STATUS } = require('../helpers/HTTPCodes.ts');

const create = async (req, res, next) => {
  const { carModel, costHour } = req.body;
  const { carId, err } = await CarsService.create(
    { carModel, costHour },
  );
  if (err) return next(err);
  return res.status(CREATED_STATUS).json({
    carId, carModel, costHour,
  });
};

const getAll = async (req, res) => {
  const cars = await CarsService.getAll();
  return res.status(OK_STATUS).json({ cars });
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const car = await CarsService.getById(id);
  const { err } = car;
  if (err) return next(err);
  return res.status(OK_STATUS).json(car);
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  const carRemoved = await CarsService.remove(id);
  const { err } = carRemoved;
  if (err) return next(err);
  return res.status(OK_STATUS).json(carRemoved);
};

const update = async (req, res, next) => {
  const { carModel, costHour, status } = req.body;
  const { id } = req.params;
  const { carId, err } = await CarsService.update({
    carId: id, carModel, costHour, status,
  });
  if (err) return next(err);
  return res.status(OK_STATUS).json({
    carId, carModel, costHour, status,
  });
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,
};
