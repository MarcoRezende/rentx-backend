"use strict";

var _tsyringe = require("tsyringe");

var _dayjs = require("./implementations/dayjs.provider");

_tsyringe.container.registerSingleton('DayJsProvider', _dayjs.DayJsProvider);