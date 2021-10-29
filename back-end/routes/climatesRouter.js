const rescue = require('express-rescue');
const express = require('express');
const ClimatesController = require('../controllers/ClimatesController');
const ErrorController = require('../controllers/ErrorController');
const validateClimatesData = require('../validators/climatesValidators');

const climatesRouter = express.Router();

climatesRouter.post('/', rescue(validateClimatesData), rescue(ClimatesController.create));
climatesRouter.get('/', rescue(ClimatesController.getAll));
climatesRouter.get('/:id', rescue(ClimatesController.getById));

climatesRouter.use(ErrorController);

module.exports = climatesRouter;
