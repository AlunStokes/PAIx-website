var express = require('express');
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  let  validID = ["alun", "mehrunnisa", "serena", "katarina", "juliette"]
  if (inArray(req.session.user, validID)) {
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

function inArray(s, a) {
  for (let i = 0; i < a.length;  i++) {
    if (a[i] == s) {
      return true;
    }
  }
  return false;
}
