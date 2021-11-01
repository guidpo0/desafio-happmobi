import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import CarsRouter from './routes/CarsRouter';
import RentsRouter from './routes/RentsRouter';
import UsersRouter from './routes/UsersRouter';
import LoginRouter from './routes/LoginRouter';

dotenv.config({ path: '../.env' });

class App {
  public app: express.Application;

  public port: string;

  public constructor() {
    this.app = express();
    this.port = process.env.PORT || '3000';
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private routes(): void {
    this.app.use(express.json());

    this.app.use('/cars', CarsRouter);

    this.app.use('/rents', RentsRouter);

    this.app.use('/users', UsersRouter);

    this.app.use('/login', LoginRouter);
  }
}

export default new App();
