import express from 'express';
import rescue from 'express-rescue';
import RentsController from '../controllers/RentsController';
import ErrorController from '../controllers/ErrorController';
import validateRentsData from '../validators/rentsValidators';
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
      '/', rescue(validateJWT), rescue(validateRentsData), rescue(RentsController.create),
    );
    this.router.get('/', rescue(RentsController.getAll));
    this.router.get('/:id', rescue(RentsController.getById));
    this.router.delete('/:id', rescue(validateJWT), rescue(RentsController.remove));
    this.router.put(
      '/:id',
      rescue(validateJWT),
      rescue(validateRentsData),
      rescue(RentsController.update),
    );
  }

  private middlewares(): void {
    this.router.use(ErrorController);
  }
}

export default new RentsRouter().router;
