import mysqlConnection from '../connections/mysqlServer';
import AddressModel from './AddressModel';
import { BaseUser, User } from '../helpers/interfaces';

class UsersModel {
  async create({
    userEmail, userPassword, userRole, firstName, lastName, phone, street, city, zip,
  }: BaseUser): Promise<User> {
    let addressId = await AddressModel.getByZip(zip);
    if (!addressId) {
      addressId = await AddressModel.create({ street, city, zip });
    }
    const [{ insertId }] = await mysqlConnection.execute(
      'INSERT INTO happmobi.Users (user_email, user_password, user_role, first_name, last_name, phone, address_id) VALUES (?,?,?,?,?,?,?)',
      [userEmail, userPassword, userRole, firstName, lastName, phone, addressId],
    );
    return {
      userId: insertId,
      userEmail,
      userPassword,
      userRole,
      firstName,
      lastName,
      phone,
      street,
      city,
      zip,
    };
  }

  async getAll(): Promise<User[]> {
    const [users] = await mysqlConnection.execute(
      'SELECT * FROM happmobi.Users AS Users INNER JOIN happmobi.Address AS Address ON Users.address_id = Address.address_id',
    );
    return users.map(({
      user_id: userId,
      user_email: userEmail,
      user_role: userRole,
      first_name: firstName,
      last_name: lastName,
      phone,
      street,
      city,
      zip,
    }) => ({
      userId, userEmail, userRole, firstName, lastName, phone, street, city, zip,
    }));
  }

  async getById(id: number): Promise<User | null> {
    const [user] = await mysqlConnection.execute(
      'SELECT * FROM happmobi.Users AS Users INNER JOIN happmobi.Address AS Address ON Users.address_id = Address.address_id WHERE user_id = ?', [id],
    );
    if (!user[0]) return null;
    return {
      userId: user[0].user_id,
      userEmail: user[0].user_email,
      userRole: user[0].user_role,
      firstName: user[0].first_name,
      lastName: user[0].last_name,
      phone: user[0].phone,
      street: user[0].street,
      city: user[0].city,
      zip: user[0].zip,
    };
  }

  async remove(id: number): Promise<User> {
    const user = await this.getById(id);
    await mysqlConnection.execute(
      'DELETE FROM happmobi.Users WHERE user_id = ?', [id],
    );
    return user;
  }

  async update({
    userId, userEmail, userPassword, userRole, firstName, lastName, phone, street, city, zip,
  }: User): Promise<User | null> {
    let addressId = await AddressModel.getByZip(zip);
    if (!addressId) {
      addressId = await AddressModel.create({ street, city, zip });
    }
    await mysqlConnection.execute(
      'UPDATE happmobi.Users SET user_email = ?, user_password = ?, user_role = ?, first_name = ?, last_name = ?, phone = ?, address_id = ? WHERE user_id = ?',
      [userEmail, userPassword, userRole, firstName, lastName, phone, addressId, userId],
    );
    const user = await this.getById(userId);
    return user;
  }

  async getByUserEmail(userEmail: string): Promise<User | null> {
    const [user] = await mysqlConnection.execute(
      'SELECT * FROM happmobi.Users AS Users INNER JOIN happmobi.Address AS Address ON Users.address_id = Address.address_id WHERE user_email = ?',
      [userEmail],
    );
    if (!user[0]) return null;
    return {
      userId: user[0].user_id,
      userEmail: user[0].user_email,
      userRole: user[0].user_role,
      userPassword: user[0].user_password,
      firstName: user[0].first_name,
      lastName: user[0].last_name,
      phone: user[0].phone,
      street: user[0].street,
      city: user[0].city,
      zip: user[0].zip,
    };
  }
}

export default new UsersModel();
