const rescue = require('express-rescue');
const express = require('express');
const DatesController = require('../controllers/DatesController');
const ErrorController = require('../controllers/ErrorController');
const validateDatesData = require('../validators/datesValidators');

const datesRouter = express.Router();

datesRouter.post('/', rescue(validateDatesData), rescue(DatesController.create));
datesRouter.get('/', rescue(DatesController.getAll));
datesRouter.get('/:id', rescue(DatesController.getById));

datesRouter.use(ErrorController);

module.exports = datesRouter;
