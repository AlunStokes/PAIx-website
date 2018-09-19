let db = require("../db");

let leaf = {};

module.exports = leaf;

leaf.submit = function(plant_id, day, location, leaf_length, leaf_width, observer) {
  if(day < 0) {
    throw new Error(`Day: ${day} is invalid`);
  }
  else if (plant_id < 1) {
    throw new Error (`Plant  id: ${plant_id} is invalid`);
  }
  else if (leaf_length < 0) {
    throw new Error(`Leaf length: ${leaf_length} is invalid`);
  }
  else if (leaf_width < 0) {
    throw new Error(`Leaf width: ${leaf_width} is invalid`);
  }

  db.pool.query("INSERT INTO leaf (plant_id, day, location, leaf_length, leaf_width, observer) VALUES (?,?,?,?,?,?)", [plant_id, day, location, leaf_length, leaf_width, observer], function(err, rows, fields) {
    if (err) {
      throw new Error(err.sqlMessage);
      return;
    }
    return;
  });
}
