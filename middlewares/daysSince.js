let moment = require("moment");

module.exports = function(req, res, next) {
  var start = moment("2018-9-20");
  var end = moment();
  res.locals.daysSince = end.diff(start, "days");
  next();
}
