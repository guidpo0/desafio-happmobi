import { Request, Response } from 'express';
import CarsService from '../services/CarsService';
import { CREATED_STATUS, OK_STATUS } from '../helpers/HTTPCodes';

class CarsController {
  public async create(req: Request, res: Response, next: any): Promise<Response> {
    const { carModel, costHour } = req.body;
    const { carId, err } = await CarsService.create(
      { carModel, costHour },
    );
    if (err) return next(err);
    return res.status(CREATED_STATUS).json({
      carId, carModel, costHour,
    });
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    const cars = await CarsService.getAll();
    return res.status(OK_STATUS).json({ cars });
  }

  public async getById(req, res, next): Promise<Response> {
    const { id } = req.params;
    const car = await CarsService.getById(id);
    const { err } = car;
    if (err) return next(err);
    return res.status(OK_STATUS).json(car);
  }

  public async remove(req, res, next): Promise<Response> {
    const { id } = req.params;
    const carRemoved = await CarsService.remove(id);
    const { err } = carRemoved;
    if (err) return next(err);
    return res.status(OK_STATUS).json(carRemoved);
  }

  public async update(req, res, next): Promise<Response> {
    const { carModel, costHour, status } = req.body;
    const { id } = req.params;
    const { carId, err } = await CarsService.update({
      carId: id, carModel, costHour, status,
    });
    if (err) return next(err);
    return res.status(OK_STATUS).json({
      carId, carModel, costHour, status,
    });
  }
}

export default new CarsController();
