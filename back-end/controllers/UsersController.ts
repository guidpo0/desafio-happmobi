const UsersService = require('../services/UsersService.ts');
const { CREATED_STATUS, OK_STATUS } = require('../helpers/HTTPCodes.ts');

const create = async (req, res, next) => {
  const {
    userEmail, userPassword, userRole, firstName, lastName, phone, street, city, zip,
  } = req.body;
  const { userId, err } = await UsersService.create(
    {
      userEmail, userPassword, userRole, firstName, lastName, phone, street, city, zip,
    },
  );
  if (err) return next(err);
  return res.status(CREATED_STATUS).json({
    userId, userEmail, userPassword, userRole, firstName, lastName, phone, street, city, zip,
  });
};

const getAll = async (req, res) => {
  const users = await UsersService.getAll();
  return res.status(OK_STATUS).json({ users });
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const user = await UsersService.getById(id);
  const { err } = user;
  if (err) return next(err);
  return res.status(OK_STATUS).json(user);
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  const userRemoved = await UsersService.remove(id);
  const { err } = userRemoved;
  if (err) return next(err);
  return res.status(OK_STATUS).json(userRemoved);
};

const update = async (req, res, next) => {
  const {
    userEmail, userPassword, userRole, firstName, lastName, phone, street, city, zip,
  } = req.body;
  const { id } = req.params;
  const { userId, err } = await UsersService.update({
    userId: id, userEmail, userPassword, userRole, firstName, lastName, phone, street, city, zip,
  });
  if (err) return next(err);
  return res.status(OK_STATUS).json({
    userId, userEmail, userPassword, userRole, firstName, lastName, phone, street, city, zip,
  });
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,
};
