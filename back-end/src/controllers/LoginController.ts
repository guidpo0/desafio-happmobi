import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import UsersModel from '../models/UsersModel';
import { UNAUTHORIZED_STATUS, OK_STATUS } from '../helpers/HTTPCodes';
import { BaseUser } from '../helpers/interfaces';
import { LOGIN_ERROR } from '../helpers/errorsCodes';

dotenv.config();

class LoginController {
  async login(
    req: Request, res: Response,
  ): Promise<Response> {
    const { userEmail, userPassword }: BaseUser = req.body;
    const user = await UsersModel.getByUserEmail(userEmail);
    if (!user) return res.status(UNAUTHORIZED_STATUS).json(LOGIN_ERROR);
    if (user.userPassword !== userPassword) {
      return res.status(UNAUTHORIZED_STATUS).json(LOGIN_ERROR);
    }
    const secret = process.env.JWT_SECRET;
    const jwtConfig = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };
    delete user.userPassword;
    const token = jwt.sign({ data: user }, secret, jwtConfig);
    return res.status(OK_STATUS).json({ token });
  }
}

export default new LoginController();
