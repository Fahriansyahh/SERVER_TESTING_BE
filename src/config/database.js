const mysql = require("mysql2");

//!setup mysql
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "fahriansyah09",
  database: "express_sql",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

module.exports = pool.promise();

// //!setup sequlize
// const { Sequelize } = require("sequelize");
// const database = new Sequelize("express_sql", "root", "fahriansyah09", {
//   dialect: "mysql",
//   host: "localhost", // Perhatikan penulisan host yang sebelumnya salah
// });

// module.exports = database;
