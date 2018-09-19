var Utilities = require("../models/utilities");
var db = require("../db");

let aphid = {};

module.exports = aphid;

aphid.submit = function(plant_id, location, observer) {
  let validLocation = ["soil", "base", "stem", "leaf-under", "leaf-over", "tip"];
  if (!Utilities.inArray(location, validLocation)) {
    throw new Error(`Location: $(location) is invalid.`);
  }
  else if(plant_id < 1 || plant_id > 35) {
    throw new Error(`Plant ID: $(plant_id) is invalid.`);
  }
  db.pool.query("INSERT INTO aphid (plant_id, location, observer) VALUES (?, ?)", [plant_id, location], function(err, rows, fields) {
    if (err) {
      console.err(err);
    }
  });
  return;
}
