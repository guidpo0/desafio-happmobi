import { Request, Response, NextFunction } from 'express';
import CarsService from '../services/CarsService';
import { CREATED_STATUS, OK_STATUS, UNAUTHORIZED_STATUS } from '../helpers/HTTPCodes';
import { BaseCar } from '../helpers/interfaces';
import { USER_UNAUTHORIZED_ERROR } from '../helpers/errorsCodes';

class CarsController {
  async create(
    req: Request, res: Response,
  ): Promise<Response | void> {
    const { userRole } = req.user;
    if (userRole !== 'admin') return res.status(UNAUTHORIZED_STATUS).json(USER_UNAUTHORIZED_ERROR);
    const { carModel, costHour }: BaseCar = req.body;
    const car = await CarsService.create(
      { carModel, costHour },
    );
    return res.status(CREATED_STATUS).json(car);
  }

  async getAll(
    req: Request, res: Response,
  ): Promise<Response> {
    const cars = await CarsService.getAll();
    return res.status(OK_STATUS).json({ cars });
  }

  async getById(
    req: Request, res: Response, next: NextFunction,
  ): Promise<Response | void> {
    const { id } = req.params;
    const car = await CarsService.getById(Number(id));
    if (car.err) return next(car.err);
    return res.status(OK_STATUS).json(car);
  }

  async remove(
    req: Request, res: Response, next: NextFunction,
  ): Promise<Response | void> {
    const { id } = req.params;
    const { userRole, userId } = req.user;
    if (userRole !== 'admin' && id !== userId) {
      return res.status(UNAUTHORIZED_STATUS).json(USER_UNAUTHORIZED_ERROR);
    }
    const carRemoved = await CarsService.remove(Number(id));
    if (carRemoved.err) return next(carRemoved.err);
    return res.status(OK_STATUS).json(carRemoved);
  }

  async update(
    req: Request, res: Response, next: NextFunction,
  ): Promise<Response | void> {
    const { id } = req.params;
    const { userRole, userId } = req.user;
    if (userRole !== 'admin' && id !== userId) {
      return res.status(UNAUTHORIZED_STATUS).json(USER_UNAUTHORIZED_ERROR);
    }
    const { carModel, costHour }: BaseCar = req.body;
    const carUpdated = await CarsService.update({
      carId: Number(id), carModel, costHour,
    });
    if (carUpdated.err) return next(carUpdated.err);
    return res.status(OK_STATUS).json(carUpdated);
  }
}

export default new CarsController();
