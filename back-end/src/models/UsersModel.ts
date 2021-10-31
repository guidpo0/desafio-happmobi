import mysqlConnection from '../connections/mysqlServer';
import { BaseUser, User } from '../helpers/interfaces';

class UsersModel {
  async create({
    userEmail, userPassword, userRole, firstName, lastName, phone, street, city, zip,
  }: BaseUser): Promise<User> {
    const [{ insertId }] = await mysqlConnection.execute(
      'INSERT INTO happmobi.Users (user_email, user_password, user_role, first_name, last_name, phone, street, city, zip,) VALUES (?,?,?,?,?,?,?,?,?)',
      [userEmail, userPassword, userRole, firstName, lastName, phone, street, city, zip],
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
      'SELECT * FROM happmobi.Users',
    );
    return users.map(({
      user_id: userId,
      user_email: userEmail,
      user_password: userPassword,
      user_role: userRole,
      first_name: firstName,
      last_name: lastName,
      phone,
      street,
      city,
      zip,
    }) => ({
      userId, userEmail, userPassword, userRole, firstName, lastName, phone, street, city, zip,
    }));
  }

  async getById(id: number): Promise<User> {
    const [user] = await mysqlConnection.execute(
      'SELECT * FROM happmobi.Users WHERE user_id = ?', [id],
    );
    return {
      userId: user[0].user_id,
      userEmail: user[0].user_email,
      userPassword: user[0].user_password,
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

  public async update({
    userId, userEmail, userPassword, userRole, firstName, lastName, phone, street, city, zip,
  }: User): Promise<User> {
    const user = await this.getById(userId);
    await mysqlConnection.execute(
      'UPDATE happmobi.Rents SET user_email = ?, user_password = ?, user_role = ?, first_name = ?, last_name = ?, phone = ?, street = ?, city = ?, zip = ? WHERE user_id = ?',
      [userEmail, userPassword, userRole, firstName, lastName, phone, street, city, zip, userId],
    );
    return user;
  }
}

export default new UsersModel();
