const express = require('express');
const rescue = require('express-rescue');
const UsersController = require('../controllers/UsersController.ts');
const ErrorController = require('../controllers/ErrorController.ts');
const validateUsersData = require('../validators/usersValidators.ts');

const districtsRouter = express.Router();

districtsRouter.post('/', rescue(validateUsersData), rescue(UsersController.create));
districtsRouter.get('/', rescue(UsersController.getAll));
districtsRouter.get('/:id', rescue(UsersController.getById));

districtsRouter.use(ErrorController);

module.exports = districtsRouter;
