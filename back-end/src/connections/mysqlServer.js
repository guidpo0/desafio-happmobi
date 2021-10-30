require('dotenv').config();
const mysql = require('mysql2/promise');

const host = process.env.DB_HOST || 'us-cdbr-east-04.cleardb.com';
const user = process.env.DB_USER || 'bd20733f81f909';

module.exports = mysql.createPool({
  host,
  user,
  password: process.env.DB_PASSWORD,
  database: 'heroku_5eb1b5a5878e473',
});
