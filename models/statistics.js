let  db = require("../db");
let Utilities = require("./utilities");

let  statistics = {};

module.exports = statistics;

statistics.orderPlantsByLeafSize = function() {
  let plants = [];
  for  (let i = 0; i < 35; i++) {
    plants.push({
      plant_id: i + 1,
      leaves_small: 0,
      leaves_medium: 0,
      leaves_large: 0
    });
  }
  db.pool.query("SELECT plant_id, leaf_size FROM leaf;", function(err, rows, fields) {
    if (err) {
      throw new Error(err.sqlMesage);
    }
    for(let i = 0; i < rows.length; i++) {
      switch(rows[i].leaf_size) {
        case 1:
        plants[rows[i].plant_id - 1].leaves_small++;
        break;
        case 2:
        plants[rows[i].plant_id - 1].leaves_medium++;
        break;
        case 3:
        plants[rows[i].plant_id - 1].leaves_large++;
        break;
      }
    }
    for (let i = 0; i < plants.length; i++) {
      plants[i].leaf_score = plants[i].leaves_small * 1 + plants[i].leaves_medium * 5 + plants[i].leaves_large * 10;
    }
    plants.sort(function(a, b) {
      return a.leaf_score - b.leaf_score;
    });
    for (let i = 0; i < plants.length; i++) {
      console.log(plants[i].plant_id);
    }
    console.log(`Ratio between largest:smallest leaf score: (${plants[34].leaf_score}/${plants[0].leaf_score}) = ${plants[34].leaf_score / plants[0].leaf_score}`);
    return;
  });
}
