import { Request, Response, NextFunction } from 'express';
import RentsService from '../services/RentsService';
import { CREATED_STATUS, OK_STATUS } from '../helpers/HTTPCodes';
import { BaseRent } from '../helpers/interfaces';

class RentsController {
  async create(
    req: Request, res: Response,
  ): Promise<Response | void> {
    const {
      carId, userId, rentStart, rentEnd,
    }: BaseRent = req.body;
    const rent = await RentsService.create(
      {
        carId, userId, rentStart, rentEnd,
      },
    );
    return res.status(CREATED_STATUS).json(rent);
  }

  async getAll(
    req: Request, res: Response,
  ): Promise<Response> {
    const rents = await RentsService.getAll();
    return res.status(OK_STATUS).json({ rents });
  }

  async getById(
    req: Request, res: Response, next: NextFunction,
  ): Promise<Response | void> {
    const { id } = req.params;
    const rent = await RentsService.getById(Number(id));
    if (rent.err) return next(rent.err);
    return res.status(OK_STATUS).json(rent);
  }

  async remove(
    req: Request, res: Response, next: NextFunction,
  ): Promise<Response | void> {
    const { id } = req.params;
    const rentRemoved = await RentsService.remove(Number(id));
    if (rentRemoved.err) return next(rentRemoved.err);
    return res.status(OK_STATUS).json(rentRemoved);
  }

  async update(
    req: Request, res: Response, next: NextFunction,
  ): Promise<Response | void> {
    const {
      carId, userId, rentStart, rentEnd, total,
    }: BaseRent = req.body;
    const { id } = req.params;
    const rentUpdated = await RentsService.update({
      rentId: Number(id), carId, userId, rentStart, rentEnd, total,
    });
    if (rentUpdated.err) return next(rentUpdated.err);
    return res.status(OK_STATUS).json(rentUpdated);
  }
}

export default new RentsController();
