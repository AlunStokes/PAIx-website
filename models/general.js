let db = require("../db");

let  general = {};

module.exports = general;

general.submit = function(plant_id, day, observation, observer) {
  db.pool.query("INSERT INTO general (plant_id, day, observation, observer) VALUES (?,?,?, ?)", [plant_id, day, observation, observer], function(err, rows, fields) {
    if (err) {
      throw new Error(err.sqlMessage);
    }
    return;
  });
}
