const ClimatesService = require('../services/ClimatesService');
const { CREATED_STATUS, OK_STATUS } = require('../helpers/HTTPCodes');

const create = async (req, res, next) => {
  const { climateHour, climateRain, dateId } = req.body;
  const { climateId, err } = await ClimatesService.create(
    { climateHour, climateRain, dateId },
  );
  if (err) return next(err);
  return res.status(CREATED_STATUS).json({
    climateId, climateHour, climateRain, dateId,
  });
};

const getAll = async (_req, res) => {
  const climates = await ClimatesService.getAll();
  return res.status(OK_STATUS).json({ climates });
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const climate = await ClimatesService.getById(id);
  const { err } = climate;
  if (err) return next(err);
  return res.status(OK_STATUS).json(climate);
};

module.exports = {
  create,
  getAll,
  getById,
};
