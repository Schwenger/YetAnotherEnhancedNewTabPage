// Generated by CoffeeScript 1.9.3
(function() {
  var checkDisjointness, finalizeRow, makeTD, makeTDString, makeTableRow, makeTimeTable, makeTooltip, show_timetable;

  makeTooltip = function(subject, period) {
    return "";
  };

  makeTDString = function(color, tooltip, duration, name, link, room, classString) {
    var td;
    return td = (" <td rowspan=" + duration + "\" class=\"" + classString + "\"> ") + (" <a class=\"class-" + duration + "\" ") + (" data-toggle=\"tooltip\" title=\"" + tooltip + "\" ") + (" href=" + link + " ") + (" style=\"background-color:" + color + ";\" > ") + (" " + name + " " + (room != null ? "<br> (" + room + ")" : "") + " ") + " </a></td> ";
  };

  makeTD = function(subject, period, classString) {
    var b, color, duration, g, link, name, r, ref, room, tooltip;
    ref = subject.color, r = ref[0], g = ref[1], b = ref[2];
    color = rgbaString(r, g, b, 1.0);
    tooltip = makeTooltip(subject, period);
    name = subject.short;
    link = subject.link;
    duration = period.duration;
    room = period.room;
    return makeTDString(color, tooltip, duration, name, link, room, classString);
  };

  finalizeRow = function(tds, rowIndex, classString) {
    var effectiveRowIndex, hour, parity, row, time;
    effectiveRowIndex = (rowIndex - rowIndex % 2) / 2;
    parity = effectiveRowIndex % 2 === 0 ? "odd" : "even";
    hour = rowIndex % 4 === 0 ? 8 + rowIndex / 2 : -1;
    time = hour !== -1 ? hour + ":00" : void 0;
    row = " <tr class=\"tr-" + parity + "\"> ";
    row += " <td class=\"table-time\">" + (time != null ? time : "") + "</td> ";
    tds.forEach(function(td) {
      return row += td;
    });
    return row + "</tr>";
  };

  makeTableRow = function(rowIndex, blocked) {
    var blockValue, classString, i, j, k, len, len1, len2, period, ref, subject, tds, weekdayId;
    tds = [];
    for (weekdayId = i = 0, len = blocked.length; i < len; weekdayId = ++i) {
      blockValue = blocked[weekdayId];
      if (blockValue === -1) {
        for (j = 0, len1 = classes.length; j < len1; j++) {
          subject = classes[j];
          ref = subject.periods;
          for (k = 0, len2 = ref.length; k < len2; k++) {
            period = ref[k];
            classString = weekdayId === 5 ? 'table-additional' : '';
            if (period.begin === rowIndex && period.weekday === weekdayId) {
              tds[weekdayId] = makeTD(subject, period, classString);
              blocked[weekdayId] = period.duration - 1;
            } else {
              if (tds[weekdayId] == null) {
                tds[weekdayId] = " <td class=\"" + classString + "\"></td> ";
              }
            }
          }
        }
      }
    }
    return finalizeRow(tds, rowIndex);
  };

  checkDisjointness = function() {
    return true;
  };

  makeTimeTable = function() {
    var blocked, i, index, lastRow, nextRow, ref, results, rowIndex, value;
    if (!checkDisjointness()) {
      throw RuntimeException;
    }
    blocked = [-1, -1, -1, -1, -1, -1];
    results = [];
    for (rowIndex = i = 0, ref = timetableSettings.rows(timetableSettings.minDurationInH); 0 <= ref ? i < ref : i > ref; rowIndex = 0 <= ref ? ++i : --i) {
      lastRow = $('#timetable tr:last');
      nextRow = makeTableRow(rowIndex, blocked);
      lastRow.after(nextRow);
      results.push((function() {
        var j, len, results1;
        results1 = [];
        for (index = j = 0, len = blocked.length; j < len; index = ++j) {
          value = blocked[index];
          if (value !== -1) {
            results1.push(blocked[index] = value - 1);
          }
        }
        return results1;
      })());
    }
    return results;
  };

  show_timetable = function() {
    return 0;
  };

}).call(this);
