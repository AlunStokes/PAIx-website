var express = require('express');
var router = express.Router();

let daysSince = require("../middlewares/daysSince");

/* GET home page. */
router.get('/', daysSince, function(req, res, next) {
  res.render('general', { title: 'General Observations' });
});

module.exports = router;
