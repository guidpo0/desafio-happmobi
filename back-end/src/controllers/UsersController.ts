import { Request, Response } from 'express';
import UsersService from '../services/UsersService';
import { CREATED_STATUS, OK_STATUS } from '../helpers/HTTPCodes';

class UsersController {
  public async create(req: Request, res: Response, next: any): Promise<Response> {
    const {
      userEmail, userPassword, userRole, firstName, lastName, phone, street, city, zip,
    } = req.body;
    const { userId, err } = await UsersService.create(
      {
        userEmail, userPassword, userRole, firstName, lastName, phone, street, city, zip,
      },
    );
    if (err) return next(err);
    return res.status(CREATED_STATUS).json({
      userId, userEmail, userPassword, userRole, firstName, lastName, phone, street, city, zip,
    });
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    const users = await UsersService.getAll();
    return res.status(OK_STATUS).json({ users });
  }

  public async getById(req, res, next): Promise<Response> {
    const { id } = req.params;
    const user = await UsersService.getById(id);
    const { err } = user;
    if (err) return next(err);
    return res.status(OK_STATUS).json(user);
  }

  public async remove(req, res, next): Promise<Response> {
    const { id } = req.params;
    const userRemoved = await UsersService.remove(id);
    const { err } = userRemoved;
    if (err) return next(err);
    return res.status(OK_STATUS).json(userRemoved);
  }

  public async update(req, res, next): Promise<Response> {
    const {
      userEmail, userPassword, userRole, firstName, lastName, phone, street, city, zip,
    } = req.body;
    const { id } = req.params;
    const { userId, err } = await UsersService.update({
      userId: id, userEmail, userPassword, userRole, firstName, lastName, phone, street, city, zip,
    });
    if (err) return next(err);
    return res.status(OK_STATUS).json({
      userId, userEmail, userPassword, userRole, firstName, lastName, phone, street, city, zip,
    });
  }
}

export default new UsersController();
