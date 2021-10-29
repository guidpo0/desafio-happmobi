const express = require('express');
const rescue = require('express-rescue');
const UsersController = require('../controllers/UsersController.ts');
const ErrorController = require('../controllers/ErrorController.ts');
const validateUsersData = require('../validators/usersValidators.ts');

const router = express.Router();

router.post('/', rescue(validateUsersData), rescue(UsersController.create));
router.get('/', rescue(UsersController.getAll));
router.get('/:id', rescue(UsersController.getById));
router.delete('/:id', rescue(UsersController.remove));
router.put('/:id', rescue(UsersController.update));

router.use(ErrorController);

module.exports = router;
