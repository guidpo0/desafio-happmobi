import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const mysqlConnection = mysql.createPool({
  host,
  user,
  database: 'happmobi',
  password,
  timezone: '+3:00',
});

export default mysqlConnection;
