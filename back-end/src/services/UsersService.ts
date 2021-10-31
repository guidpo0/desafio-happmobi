import UsersModel from '../models/UsersModel';
import { BaseUser, User, ResponseError } from '../helpers/interfaces';
import { USER_NOT_FOUND_ERROR } from '../helpers/errorsCodes';

class UsersService {
  async create({
    userEmail, userPassword, userRole, firstName, lastName, phone, street, city, zip,
  }: BaseUser): Promise<User> {
    return UsersModel.create({
      userEmail, userPassword, userRole, firstName, lastName, phone, street, city, zip,
    });
  }

  async getAll(): Promise<User[]> {
    return UsersModel.getAll();
  }

  async getById(userId: number): Promise<User | ResponseError> {
    const user = await UsersModel.getById(userId);
    if (!user) {
      return USER_NOT_FOUND_ERROR;
    }
    return user;
  }

  async remove(userId: number): Promise<User | ResponseError> {
    const removedUser = await UsersModel.remove(userId);
    if (!removedUser) {
      return USER_NOT_FOUND_ERROR;
    }
    return removedUser;
  }

  async update({
    userId, userEmail, userPassword, userRole, firstName, lastName, phone, street, city, zip,
  }: User): Promise<User | ResponseError> {
    const updatedUser = await UsersModel.update({
      userId, userEmail, userPassword, userRole, firstName, lastName, phone, street, city, zip,
    });
    if (!updatedUser) {
      return USER_NOT_FOUND_ERROR;
    }
    return updatedUser;
  }
}

export default new UsersService();
