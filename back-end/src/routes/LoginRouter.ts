import express from 'express';
import rescue from 'express-rescue';
import LoginController from '../controllers/LoginController';
import ErrorController from '../controllers/ErrorController';
import validateLoginData from '../validators/loginValidators';

class RentsRouter {
  public router: express.Router;

  public constructor() {
    this.router = express.Router();
    this.routes();
    this.middlewares();
  }

  private routes(): void {
    this.router.post('/', rescue(validateLoginData), rescue(LoginController.login));
  }

  private middlewares(): void {
    this.router.use(ErrorController);
  }
}

export default new RentsRouter().router;
