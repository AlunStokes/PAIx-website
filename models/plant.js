let db = require("../db");

let plant = {}

module.exports = plant;

plant.submitWN = function(plant_id, day, plant_height, stem_width, splint, n_conc, observer) {
  if (plant_id < 1) {
    throw new Error(`Plant id: ${plant_id} is invalid`);
  }
  else if (day < 0) {
    throw new Error(`Day: ${day} is invalid`);
  }
  else if (plant_height < 0) {
    throw new Error(`Plant height: ${plant_height} is invalid`);
  }
  else if (stem_width < 0) {
    throw new Error(`Stem width: ${stem_width} is invalid`);
  }
  else if (splint != 0 && splint != 1) {
    throw new Error(`Splint: ${splint} is invalid`);
  }
  db.pool.query("INSERT INTO plant (plant_id, day, plant_height, stem_width, splint, n_conc, observer) VALUES (?,?,?,?,?,?,?)", [plant_id, day, plant_height, stem_width, splint, n_conc, observer], function(err, rows, fields) {
    if (err) {
      throw new Error(err.sqlMessage);
    }
    return;
  });
}

plant.submit = function(plant_id, day, plant_height, stem_width, splint, observer) {
  if (plant_id < 1 || plant_id > 35) {
    throw new Error(`Plant id: ${plant_id} is invalid`);
  }
  else if (day < 0) {
    throw new Error(`Day: ${day} is invalid`);
  }
  else if (plant_height < 0) {
    throw new Error(`Plant height: ${plant_height} is invalid`);
  }
  else if (stem_width < 0) {
    throw new Error(`Stem width: ${stem_width} is invalid`);
  }
  else if (splint != 0 && splint != 1) {
    throw new Error(`Splint: ${splint} is invalid`);
  }
  db.pool.query("INSERT INTO plant (plant_id, day, plant_height, stem_width, splint, observer) VALUES (?,?,?,?,?,?)", [plant_id, day, plant_height, stem_width, splint, observer], function(err, rows, fields) {
    if (err) {
      throw new Error(err.sqlMessage);
    }
    return;
  });
}
