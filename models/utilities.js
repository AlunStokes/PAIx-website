let  Json2csvParser = require('json2csv').Parser;

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

utilities.searchByProp = function(a, p, v) {
  for (let i = 0; i < a.length; i++) {
    if (a[i][p] == v) {
      return i;
    }
  }
  return -1;
}

utilities.arrayToCSV = function(fields, data, callback) {
  let opts = {fields};
  try {
    let parser = new Json2csvParser(opts);
    let csv = parser.parse(data);
    console.log(csv);
  } catch (err) {
    console.error(err);
  }
  callback()
  return;
}

utilities.numUniqueInArrayByProp = function(a, p, callback) {
  let n  = 0;
  let na = [];
  for (let i = 0; i < a.length; i++) {
    if (!na.includes(a[i][p])) {
      na.push(a[i][p])
      n++;
    }
  }
  na.sort(function(a, b ) {
    return a - b;
  })
  callback(n, na);
  return;
}

utilities.numEntriesWithPropValue = function(a, p, v, callback) {
  let  n = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i][p]  == v) {
      n++;
    }
  }
  callback(n);
  return;
}

utilities.numEntriesWithPropValueMultiple = function(a, p, v, callback) {
  let  n = 0;
  for (let i = 0; i < a.length; i++) {
    let t = 0;
    for (let j = 0; j < p.length; j++) {
      if (a[i][p[j]] == v[j]) {
        t++;
      }
      if (t == p.length) {
        n++;
      }
    }
  }
  callback(n);
  return;
}
