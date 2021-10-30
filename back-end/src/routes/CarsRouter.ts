import express from 'express';
import rescue from 'express-rescue';
import CarsController from '../controllers/CarsController';
import ErrorController from '../controllers/ErrorController';
import ValidateCarsData from '../validators/carsValidators';

class RentsRouter {
  public router: express.Router;

  public constructor() {
    this.router = express.Router();
    this.routes();
    this.middlewares();
  }

  private routes(): void {
    this.router.post('/', rescue(ValidateCarsData), rescue(CarsController.create));
    this.router.get('/', rescue(CarsController.getAll));
    this.router.get('/:id', rescue(CarsController.getById));
    this.router.delete('/:id', rescue(CarsController.remove));
    this.router.put('/:id', rescue(CarsController.update));
  }

  private middlewares(): void {
    this.router.use(ErrorController);
  }
}

export default new RentsRouter().router;
