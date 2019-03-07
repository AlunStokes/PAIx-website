Statistics = require("../models/statistics");
Utilities = require("../models/utilities");

Statistics.retreiveDataPerPlant(function(data) {
  Utilities.arrayToCSV(["plant_id", "day", "num_aphids", "leaves_small", "leaves_medium", "leaves_large", "total_leaves", "plant_height", "stem_width", "n_conc", "control", "observer_plant"], data, function(){
    return;
  });
});
