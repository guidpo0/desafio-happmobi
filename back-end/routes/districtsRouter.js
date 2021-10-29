const rescue = require('express-rescue');
const express = require('express');
const DistrictsController = require('../controllers/DistrictsController');
const ErrorController = require('../controllers/ErrorController');
const validateDistrictsData = require('../validators/districtsValidators');

const districtsRouter = express.Router();

districtsRouter.post('/', rescue(validateDistrictsData), rescue(DistrictsController.create));
districtsRouter.get('/', rescue(DistrictsController.getAll));
districtsRouter.get('/:id', rescue(DistrictsController.getById));

districtsRouter.use(ErrorController);

module.exports = districtsRouter;
