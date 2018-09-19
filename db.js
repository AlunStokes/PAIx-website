var mysql = require("mysql2");

module.exports = {
  pool: mysql.createPool({
    connectionLimit: 5,
    multipleStatements: true,
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "paix"
  })
}
