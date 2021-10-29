const express = require('express');
const rescue = require('express-rescue');
const CarsController = require('../controllers/CarsController.ts');
const ErrorController = require('../controllers/ErrorController.ts');
const validateCarsData = require('../validators/carsValidators.ts');

const router = express.Router();

router.post('/', rescue(validateCarsData), rescue(CarsController.create));
router.get('/', rescue(CarsController.getAll));
router.get('/:id', rescue(CarsController.getById));
router.delete('/:id', rescue(CarsController.remove));
router.put('/:id', rescue(CarsController.update));

router.use(ErrorController);

module.exports = router;
