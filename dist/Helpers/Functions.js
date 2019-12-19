export var day = 1000 * 60 * 60 * 24;
export var getDaysInMonth = function getDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
};
export var monthDiff = function monthDiff(d1, d2) {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months + 1;
};
export var dayDiff = function dayDiff(d1, d2) {
  return Math.round(Math.abs((new Date(d1).getTime() - new Date(d2).getTime()) / day));
};
export var timeDiff = function timeDiff(d1, d2) {
  return new Date(d1).getTime() - new Date(d2).getTime();
};
export var randomRGBAColor = function randomRGBAColor(alpha, min, max) {
  var minByte = min ? min : 0;
  var maxByte = max ? max : 255;

  var randomNumber = function randomNumber() {
    return Math.floor(Math.random() * (maxByte - minByte + 1) + minByte);
  };

  return "rgba(".concat([randomNumber(), randomNumber(), randomNumber(), alpha].join(','), ")");
};
export var rgbaFromArray = function rgbaFromArray(arr, alpha) {
  if (!arr || arr.length !== 3) return null;
  return "rgba(".concat(arr.join(','), ", ").concat(alpha ? alpha : 1, ")");
};