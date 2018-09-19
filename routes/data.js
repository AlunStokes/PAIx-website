var express = require('express');
var router = express.Router();

var Utilities = require("../models/utilities");

/* GET home page. */
router.get("/", function(req, res, next) {
  let  validID = ["alun", "mehrunnisa", "serena", "katarina", "juliette"]
  if (Utilities.inArray(req.session.user, validID)) {
    res.render("data");
    return;
  }
  res.redirect("/");
});

router.post('/', function(req, res, next) {
  let  validID = ["alun", "mehrunnisa", "serena", "katarina", "juliette"];
  if (inArray(req.body.user, validID)) {
    req.session.user = req.body.user;
    res.locals.user = req.session.user;
    res.render('data', {title: "Enter Data"});
  }
  else {
    res.redirect("/");
  }
  return;
});

module.exports = router;
