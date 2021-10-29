const ClimatesModel = require('../models/ClimatesModel');
const DatesModel = require('../models/DatesModel');

const create = async ({ climateHour, climateRain, dateId }) => {
  const dates = await DatesModel.getAll();
  const existingDate = dates.some((date) => date.date_id === dateId);

  if (!existingDate) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Date ID not found',
      },
    };
  }
  return ClimatesModel.create({ climateHour, climateRain, dateId });
};

const getAll = async () => ClimatesModel.getAll();

const getById = async (id) => {
  const climate = await ClimatesModel.getById(id);
  if (!climate) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Climate not found',
      },
    };
  }
  return climate;
};

module.exports = {
  create,
  getAll,
  getById,
};
