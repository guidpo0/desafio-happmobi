import { Request, Response } from 'express';
import RentsService from '../services/RentsService';
import { CREATED_STATUS, OK_STATUS } from '../helpers/HTTPCodes';

class RentsController {
  public async create(req: Request, res: Response, next: any): Promise<Response> {
    const {
      carId, userId, rentStart, rentEnd, total,
    } = req.body;
    const { rentId, err } = await RentsService.create({
      carId, userId, rentStart, rentEnd, total,
    });
    if (err) return next(err);
    return res.status(CREATED_STATUS).json({
      rentId, carId, userId, rentStart, rentEnd, total,
    });
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    const rents = await RentsService.getAll();
    return res.status(OK_STATUS).json({ rents });
  }

  public async getById(req, res, next): Promise<Response> {
    const { id } = req.params;
    const rent = await RentsService.getById(id);
    const { err } = rent;
    if (err) return next(err);
    return res.status(OK_STATUS).json(rent);
  }

  public async remove(req, res, next): Promise<Response> {
    const { id } = req.params;
    const rentRemoved = await RentsService.remove(id);
    const { err } = rentRemoved;
    if (err) return next(err);
    return res.status(OK_STATUS).json(rentRemoved);
  }

  public async update(req, res, next): Promise<Response> {
    const {
      carId, userId, rentStart, rentEnd, total,
    } = req.body;
    const { id } = req.params;
    const { rentId, err } = await RentsService.update({
      rentId: id, carId, userId, rentStart, rentEnd, total,
    });
    if (err) return next(err);
    return res.status(OK_STATUS).json({
      rentId, carId, userId, rentStart, rentEnd, total,
    });
  }
}

export default new RentsController();
