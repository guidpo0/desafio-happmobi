import { Request, Response, NextFunction } from 'express';
import UsersService from '../services/UsersService';
import { CREATED_STATUS, OK_STATUS } from '../helpers/HTTPCodes';
import { BaseUser } from '../helpers/interfaces';

class UsersController {
  async create(
    req: Request, res: Response,
  ): Promise<Response | void> {
    const {
      userEmail, userPassword, userRole, firstName, lastName, phone, street, city, zip,
    }: BaseUser = req.body;
    const user = await UsersService.create(
      {
        userEmail, userPassword, userRole, firstName, lastName, phone, street, city, zip,
      },
    );
    return res.status(CREATED_STATUS).json(user);
  }

  async getAll(
    req: Request, res: Response,
  ): Promise<Response> {
    const users = await UsersService.getAll();
    return res.status(OK_STATUS).json({ users });
  }

  async getById(
    req: Request, res: Response, next: NextFunction,
  ): Promise<Response | void> {
    const { id } = req.params;
    const user = await UsersService.getById(Number(id));
    if (user.err) return next(user.err);
    return res.status(OK_STATUS).json(user);
  }

  async remove(
    req: Request, res: Response, next: NextFunction,
  ): Promise<Response | void> {
    const { id } = req.params;
    const userRemoved = await UsersService.remove(Number(id));
    if (userRemoved.err) return next(userRemoved.err);
    return res.status(OK_STATUS).json(userRemoved);
  }

  async update(
    req: Request, res: Response, next: NextFunction,
  ): Promise<Response | void> {
    const {
      userEmail, userPassword, userRole, firstName, lastName, phone, street, city, zip,
    }: BaseUser = req.body;
    const { id } = req.params;
    const userUpdated = await UsersService.update({
      userId: Number(id),
      userEmail,
      userPassword,
      userRole,
      firstName,
      lastName,
      phone,
      street,
      city,
      zip,
    });
    if (userUpdated.err) return next(userUpdated.err);
    return res.status(OK_STATUS).json(userUpdated);
  }
}

export default new UsersController();
