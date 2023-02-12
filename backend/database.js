const mysql = require("mysql");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  connectionLimit: 5,
});

exports.pool = pool;
exports.mysql = mysql;
