"use strict";

exports.__esModule = true;
exports.default = void 0;

var _typeorm = require("typeorm");

var _default = async (host = 'database_ignite') => {
  const defaultOptions = await (0, _typeorm.getConnectionOptions)();
  return (0, _typeorm.createConnection)(Object.assign(defaultOptions, {
    /**
     * host e database configurados de acordo
     * com o ambiente.
     *
     * quando em desenvolvimento, é importante usar um
     * banco para testes
     *
     * a variável NODE_ENV foi setada para `test`
     * junto com o script do jest
     */
    host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
    database: process.env.NODE_ENV === 'test' ? 'rentx_test' : defaultOptions.database
  }));
};

exports.default = _default;