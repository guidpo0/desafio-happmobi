const express = require('express');
const rescue = require('express-rescue');
const RentsController = require('../controllers/RentsController.ts');
const ErrorController = require('../controllers/ErrorController.ts');
const validateRentsData = require('../validators/rentsValidators.ts');

const router = express.Router();

router.post('/', rescue(validateRentsData), rescue(RentsController.create));
router.get('/', rescue(RentsController.getAll));
router.get('/:id', rescue(RentsController.getById));

router.use(ErrorController);

module.exports = router;
