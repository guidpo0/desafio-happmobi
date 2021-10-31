import { Request, Response, NextFunction } from 'express';
import CarsService from '../services/CarsService';
import { CREATED_STATUS, OK_STATUS } from '../helpers/HTTPCodes';
import { BaseCar } from '../helpers/interfaces';

class CarsController {
  public async create(
    req: Request, res: Response, next: NextFunction,
  ): Promise<Response | void> {
    const { carModel, costHour, rentStatus }: BaseCar = req.body;
    const { carId, err } = await CarsService.create(
      { carModel, costHour, rentStatus },
    );
    if (err) return next(err);
    return res.status(CREATED_STATUS).json({
      carId, carModel, costHour,
    });
  }

  // public async getAll(
  //   req: Request, res: Response,
  // ): Promise<Response> {
  //   const cars = await CarsService.getAll();
  //   return res.status(OK_STATUS).json({ cars });
  // }

  // public async getById(
  //   req: Request, res: Response, next: NextFunction,
  // ): Promise<Response> {
  //   const { id } = req.params;
  //   const car = await CarsService.getById(id);
  //   const { err } = car;
  //   if (err) return next(err);
  //   return res.status(OK_STATUS).json(car);
  // }

  // public async remove(
  //   req: Request, res: Response, next: NextFunction,
  // ): Promise<Response> {
  //   const { id } = req.params;
  //   const carRemoved = await CarsService.remove(id);
  //   const { err } = carRemoved;
  //   if (err) return next(err);
  //   return res.status(OK_STATUS).json(carRemoved);
  // }

  // public async update(
  //   req: Request, res: Response, next: NextFunction,
  // ): Promise<Response> {
  //   const { carModel, costHour, status } = req.body;
  //   const { id } = req.params;
  //   const { carId, err } = await CarsService.update({
  //     carId: id, carModel, costHour, status,
  //   });
  //   if (err) return next(err);
  //   return res.status(OK_STATUS).json({
  //     carId, carModel, costHour, status,
  //   });
  // }

  // public constructor() {
  //   this.create = this.create.bind(this);
  //   this.getAll = this.getAll.bind(this);
  //   this.getById = this.getById.bind(this);
  //   this.remove = this.remove.bind(this);
  //   this.update = this.update.bind(this);
  // }
}

export default new CarsController();
