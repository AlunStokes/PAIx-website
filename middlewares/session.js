module.exports = function(req, res, next) {
  if (res.session !== undefined) {
    req.session = {};
    req.session.user = "Logged out";
  }
  Object.assign(res.locals, req.session);
  next();
}
