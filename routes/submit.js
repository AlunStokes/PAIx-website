var express = require('express');
var router = express.Router();

var Aphid = require("../models/aphid");
var Leaf = require("../models/leaf");
var Plant = require("../models/plant");
var General = require("../models/general");

/* GET home page. */
router.post('/', function(req, res, next) {
  switch(req.body.category) {
    case "plant":
      if (req.body.n_conc != "") {
        Plant.submitWN(req.body.plant_id, req.body.day, req.body.plant_height, req.body.stem_width, req.body.splint, req.body.n_conc, req.session.user);
        res.redirect("/plant");
        return;
      }
      Plant.submit(req.body.plant_id, req.body.day, req.body.plant_height, req.body.stem_width, req.body.splint, req.session.user);
      res.redirect("/plant");
    break;
    case "leaf":
      Leaf.submit(req.body.plant_id,req.body.day, req.body.location, req.body.size, req.session.user);
      res.redirect("./leaf");
    break;
    case "aphid":
      Aphid.submit(req.body.plant_id, req.body.day, req.body.location, req.body.num_aphids, req.session.user);
      res.redirect("/aphid");
    break;
    case "general":
      General.submit(req.body.plant_id, req.body.day, req.body.observation, req.session.user)
      res.redirect("/general");
    break;
    default:
    res.redirect("/");
  }
});

module.exports = router;
