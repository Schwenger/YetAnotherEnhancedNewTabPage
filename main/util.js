// Generated by CoffeeScript 1.9.3
(function() {
  var beginId, rgbaString, split, splitBy, timetableSettings, weekday;

  beginId = function(time) {
    return (time - 800) / (timetableSettings.minDurationInH * 100);
  };

  timetableSettings = {
    rows: function(minDurationInH) {
      return 10 / minDurationInH;
    },
    minDurationInH: 0.5
  };

  weekday = function(day) {
    switch (day) {
      case "Monday":
        return 0;
      case "Tuesday":
        return 1;
      case "Wednesday":
        return 2;
      case "Thursday":
        return 3;
      case "Fryday":
        return 4;
      case "Additional":
        return 5;
      default:
        return -1;
    }
  };

  rgbaString = function(r, g, b, o) {
    return "rgba(" + r + "," + g + "," + b + "," + o + ")";
  };

  split = function(items, length) {
    var i, j, numberOfRows, ref, res, results, startIndex;
    numberOfRows = Math.ceil(items.length / length);
    res = [];
    results = [];
    for (i = j = 0, ref = numberOfRows; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      startIndex = i * length;
      results.push(res[i] = items.slice(startIndex, startIndex + length));
    }
    return results;
  };

  splitBy = function(attribute, list) {
    var item, j, len, res1, res2;
    res1 = [];
    res2 = [];
    for (j = 0, len = list.length; j < len; j++) {
      item = list[j];
      (item[attribute] ? res1 : res2).push(item);
    }
    return [res1, res2];
  };

}).call(this);
