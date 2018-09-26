var utilities = {};

module.exports = utilities;

utilities.inArray = function(s, a) {
  for (let i = 0; i < a.length;  i++) {
    if (a[i] == s) {
      return true;
    }
  }
  return false;
}

utilities.minIDByProp = function(array, prop) {
  let min = 0;
  for (let i = 1; i < array.length; i++) {
    if (array[i].prop < array[min].prop) {
      min = i;
    }
  }
  return i;
}
