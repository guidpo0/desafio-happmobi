const DistrictsModel = require('../models/DistrictsModel');

const create = ({ districtName, state }) => DistrictsModel.create(
  { districtName, state },
);

const getAll = () => DistrictsModel.getAll();

const getById = async (id) => {
  const district = await DistrictsModel.getById(id);
  if (!district) {
    return {
      err: {
        code: 'invalid_data',
        message: 'District not found',
      },
    };
  }
  return district;
};

module.exports = {
  create,
  getAll,
  getById,
};
