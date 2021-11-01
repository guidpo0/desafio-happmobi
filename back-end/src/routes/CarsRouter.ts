import express from 'express';
import rescue from 'express-rescue';
import CarsController from '../controllers/CarsController';
import ErrorController from '../controllers/ErrorController';
import validateCarsData from '../validators/carsValidators';
import validateJWT from '../auth/validateJWT';

class RentsRouter {
  public router: express.Router;

  public constructor() {
    this.router = express.Router();
    this.routes();
    this.middlewares();
  }

  private routes(): void {
    this.router.post(
      '/', rescue(validateJWT), rescue(validateCarsData), rescue(CarsController.create),
    );
    this.router.get('/', rescue(CarsController.getAll));
    this.router.get('/:id', rescue(CarsController.getById));
    this.router.delete('/:id', rescue(validateJWT), rescue(CarsController.remove));
    this.router.put(
      '/:id', rescue(validateJWT), rescue(validateCarsData), rescue(CarsController.update),
    );
  }

  private middlewares(): void {
    this.router.use(ErrorController);
  }
}

export default new RentsRouter().router;
