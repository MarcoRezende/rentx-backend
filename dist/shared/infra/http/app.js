"use strict";

exports.__esModule = true;
exports.app = void 0;

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _upload = _interopRequireDefault(require("../../../config/upload"));

var _appError = require("../../errors/app-error");

var _typeorm = _interopRequireDefault(require("../typeorm"));

var _swagger = _interopRequireDefault(require("../../../swagger.json"));

require("../../container");

var _routes = require("./routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * necessario para que o node consiga tratar erros assincronos.
 */

/** importa o arquivo que inicia a conexão com o banco de dados */
(0, _typeorm.default)();
const app = (0, _express.default)();
exports.app = app;
app.use(_express.default.json());
/**
 * utilizaremos o swagger para criar a documentação da nossa
 * api de forma manual, atraves de 'swagger.json'
 */

app.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default));
app.use('/avatar', _express.default.static(`${_upload.default.tmpFolder}/avatar`));
app.use('/cars', _express.default.static(`${_upload.default.tmpFolder}/cars`));
app.use(_routes.router);
/**
 * após importar o "express-async-errors", podemos criar esse middleware
 * basico para lidar com erros "jogados" (`throw new AppError`).
 */

app.use((err, _request, response, next) => {
  if (err instanceof _appError.AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`
  });
});