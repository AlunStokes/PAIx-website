var mysql = require("mysql2");

module.exports = {
  pool: mysql.createPool({
    connectionLimit: 5,
    multipleStatements: true,
    host: "178.128.233.37",
    user: "root",
    password: "12345678",
    database: "paix"
  })
}
