var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.user !== undefined) {
    req.session.user = null;
    res.locals.user = null;
  }
  res.render('index', { title: 'Login'});
});

module.exports = router;
