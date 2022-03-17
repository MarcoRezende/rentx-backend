"use strict";

exports.__esModule = true;
exports.AppError = void 0;

/**
 * simples classe para lidar om erros e manter os mesmos
 * sobre controle.
 */
class AppError {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }

}

exports.AppError = AppError;