import mysqlConnection from '../connections/mysqlServer';
import { BaseAddress } from '../helpers/interfaces';

class AddressModel {
  async create({
    street, city, zip,
  }: BaseAddress): Promise<number> {
    const [{ insertId }] = await mysqlConnection.execute(
      'INSERT INTO happmobi.Address (street, city, zip) VALUES (?,?,?)',
      [street, city, zip],
    );
    return insertId;
  }

  async getByZip(zip: string): Promise<number | null> {
    const [address] = await mysqlConnection.execute(
      'SELECT address_id FROM happmobi.Address WHERE zip = ?', [zip],
    );
    if (!address[0]) return null;
    return address[0].address_id;
  }
}

export default new AddressModel();
