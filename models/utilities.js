let utilities = {};

module.exports = utilities;

utilities.inArray = function(s, a) {
  for (let i = 0; i < a.length;  i++) {
    if (a[i] == s) {
      return true;
    }
  }
  return false;
}
