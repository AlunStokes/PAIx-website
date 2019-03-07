let  db = require("../db");
let Utilities = require("./utilities");

let  statistics = {};

module.exports = statistics;

statistics.orderPlantsByLeafSize = function(callback) {
  let plants = [];
  for  (let i = 0; i < 35; i++) {
    plants.push({
      plant_id: i + 1,
      leaves_small: 0,
      leaves_medium: 0,
      leaves_large: 0
    });
  }
  db.pool.query("SELECT plant_id, leaf_size, observer FROM leaf;", function(err, rows, fields) {
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
      plants[rows[i].plant_id - 1].observer_leaf = rows[i].observer;
    }
    for (let i = 0; i < plants.length; i++) {
      plants[i].total_leaves = plants[i].leaves_small + plants[i].leaves_medium + plants[i].leaves_large;
    }
    plants.sort(function(a, b) {
      return a.total_leaves - b.total_leaves;
    });
    callback(plants);
    return;
  });
}

statistics.retreiveDataPerAphid = function(callback) {
  let aphid = []
  let plant = [];
  let leaf = [];
  db.pool.query("SELECT * FROM aphid;", function(err, rows, fields) {
    for (let i = 0; i < rows.length; i++) {
      aphid.push({
        plant_id: rows[i].plant_id,
        day: rows[i].day,
        location: rows[i].location,
        observer_aphid: rows[i].observer
      });
    }
    db.pool.query("SELECT  * FROM plant", function(err, rows, fields) {
      for (let i = 0; i < rows.length; i++) {
        plant.push({
          plant_id: rows[i].plant_id,
          plant_height: rows[i].plant_height,
          stem_width: rows[i].stem_width,
          n_conc: rows[i].n_conc,
          control: rows[i].control,
          observer_plant: rows[i].observer
        });
      }

      statistics.orderPlantsByLeafSize(function(plants) {
        leaf = plants;
        let data = aphid;
        for (let i = 0; i < data.length; i++) {
          let index = Utilities.searchByProp(leaf, "plant_id", data[i].plant_id);
          data[i].leaves_small = leaf[index].leaves_small;
          data[i].leaves_medium = leaf[index].leaves_medium;
          data[i].leaves_large = leaf[index].leaves_large;

          index = Utilities.searchByProp(plant, "plant_id", data[i].plant_id);
          data[i].plant_height = plant[index].plant_height;
          data[i].stem_width = plant[index].stem_width;
          data[i].n_conc = plant[index].n_conc;
          data[i].control = plant[index].control;
          data[i].observer_plant = plant[index].observer_plant;
        }

        callback(data);
        return;


      });


    });
  });
}

statistics.retreiveDataPerPlant = function(callback) {
  let aphid = []
  let plant = [];
  let leaf = [];
  db.pool.query("SELECT * FROM aphid;", function(err, rows, fields) {
    for (let i = 0; i < rows.length; i++) {
      aphid.push({
        plant_id: rows[i].plant_id,
        day: rows[i].day,
        location: rows[i].location,
        observer_aphid: rows[i].observer
      });
    }
    db.pool.query("SELECT * FROM plant", function(err, rows, fields) {
      for (let i = 0; i < rows.length; i++) {
        plant.push({
          plant_id: rows[i].plant_id,
          plant_height: rows[i].plant_height,
          stem_width: rows[i].stem_width,
          n_conc: rows[i].n_conc,
          control: rows[i].control,
          observer_plant: rows[i].observer
        });
      }

      statistics.orderPlantsByLeafSize(function(plants) {
        leaf = plants;
        let data = [];

        Utilities.numUniqueInArrayByProp(aphid, "day", function(num, unique) {
          for (let j = 0; j < num; j++) {
            for (let i = 1; i <= 35; i++) {
              data.push({
                plant_id: i,
                day: unique[j]
              })
            }
          }

          for (let i = 0; i < data.length; i++) {
            Utilities.numEntriesWithPropValueMultiple(aphid, ["day", "plant_id"], [data[i].day, data[i].plant_id], function(numAphids) {
              data[i].num_aphids = numAphids;
            });

            let index = Utilities.searchByProp(leaf, "plant_id", data[i].plant_id);
            data[i].leaves_small = leaf[index].leaves_small;
            data[i].leaves_medium = leaf[index].leaves_medium;
            data[i].leaves_large = leaf[index].leaves_large;
            data[i].total_leaves = leaf[index].total_leaves;

            index = Utilities.searchByProp(plant, "plant_id", data[i].plant_id);
            data[i].plant_height = plant[index].plant_height;
            data[i].stem_width = plant[index].stem_width;
            data[i].n_conc = plant[index].n_conc;
            data[i].control = plant[index].control;
            data[i].observer_plant = plant[index].observer_plant;
          }

          for (let i = 0; i < 10; i ++) {
            //console.log(data[i]);
          }

          callback(data);
          return;

        });


      });


    });
  });
}
