var express = require('express');
var router = express.Router();

var Aphid = require("../models/aphid");
//var Leaf = require("../models/leaf");
//var Plant = require("../models/plant");

/* GET home page. */
router.post('/', function(req, res, next) {
  switch(req.body.category) {
    case "plant":

    break;
    case "leaf":

    break;
    case "aphid":
      Aphid.submit(req.body.plant_id, req.body.location, req.session.user);
      res.redirect("/data");
    break;
    default:
    res.redirect("/");
  }
});

module.exports = router;
