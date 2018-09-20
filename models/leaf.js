let db = require("../db");

let leaf = {};

module.exports = leaf;

leaf.submit = function(plant_id, day, location, leaf_size, observer) {
  if(day < 0) {
    throw new Error(`Day: ${day} is invalid`);
  }
  else if (plant_id < 1) {
    throw new Error (`Plant  id: ${plant_id} is invalid`);
  }

  db.pool.query("INSERT INTO leaf (plant_id, day, location, leaf_size, observer) VALUES (?,?,?,?,?)", [plant_id, day, location, leaf_size, observer], function(err, rows, fields) {
    if (err) {
      throw new Error(err.sqlMessage);
      return;
    }
    return;
  });
}
