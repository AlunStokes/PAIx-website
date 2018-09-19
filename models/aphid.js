var Utilities = require("../models/utilities");
var db = require("../db");

let aphid = {};

module.exports = aphid;

aphid.submit = function(plant_id, day, location, observer) {
  let validLocation = ["soil", "base", "stem", "leaf-under", "leaf-over", "tip"];
  if (!Utilities.inArray(location, validLocation)) {
    throw new Error(`Location: ${location} is invalid.`);
  }
  else if(plant_id < 1) {
    throw new Error(`Plant ID: ${plant_id} is invalid.`);
  }
  db.pool.query("INSERT INTO aphid (plant_id, day, location, observer) VALUES (?, ?, ?, ?)", [plant_id, day, location, observer], function(err, rows, fields) {
    if (err) {
      throw new Error(err.sqlMessage);
    }
  });
  return;
}
