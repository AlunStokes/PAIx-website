var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
  res.redirect("/");
});

/* GET home page. */
router.post('/', function(req, res, next) {
  switch(req.body.category) {
    case "plant":
    res.redirect("plant");
    break;
    case "aphid":
    res.redirect("aphid");
    break;
    case "leaf":
    res.redirect("leaf");
    break;
    default:
    res.redirect("/");
  }
});

module.exports = router;
