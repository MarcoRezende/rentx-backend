"use strict";

exports.__esModule = true;
exports.DayJsProvider = void 0;

var _dayjs = _interopRequireDefault(require("dayjs"));

var _utc = _interopRequireDefault(require("dayjs/plugin/utc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dayjs.default.extend(_utc.default);

class DayJsProvider {
  now() {
    return (0, _dayjs.default)().toDate();
  }

  compareInHours(starDate, endDate) {
    return (0, _dayjs.default)(this.convertToUTC(endDate)).diff(this.convertToUTC(starDate), 'hours');
  }

  compareInDays(starDate, endDate) {
    return (0, _dayjs.default)(this.convertToUTC(endDate)).diff(this.convertToUTC(starDate), 'days');
  }

  convertToUTC(date) {
    return (0, _dayjs.default)(date).utc().local().format();
  }

  addDays(days) {
    return (0, _dayjs.default)().add(days, 'days').toDate();
  }

  addHours(hours) {
    return (0, _dayjs.default)().add(hours, 'hours').toDate();
  }

  isBefore(starDate, endDate) {
    return (0, _dayjs.default)(starDate).isBefore(endDate);
  }

}

exports.DayJsProvider = DayJsProvider;