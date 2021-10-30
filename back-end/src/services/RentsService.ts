const DatesModel = require('../models/DatesModel');
const DistrictsModel = require('../models/DistrictsModel');

const create = async ({ dateName, districtId }) => {
  const districts = await DistrictsModel.getAll();

  const existingDistrict = districts.some((district) => district.district_id === districtId);
  if (!existingDistrict) {
    return {
      err: {
        code: 'invalid_data',
        message: 'District ID not found',
      },
    };
  }
  return DatesModel.create({ dateName, districtId });
};

const getAll = () => DatesModel.getAll();

const getById = async (id) => {
  const date = await DatesModel.getById(id);
  if (!date) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Date not found',
      },
    };
  }
  return date;
};

module.exports = {
  create,
  getAll,
  getById,
};
