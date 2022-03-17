"use strict";

exports.__esModule = true;
exports.ensureAuthenticated = ensureAuthenticated;

var _jsonwebtoken = require("jsonwebtoken");

var _auth = require("../../../../config/auth");

var _appError = require("../../../errors/app-error");

async function ensureAuthenticated(request, _response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new _appError.AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const {
      sub: userId
    } = (0, _jsonwebtoken.verify)(token, _auth.secretToken);
    request.user = {
      id: userId
    };
    next();
  } catch {
    throw new _appError.AppError('Invalid token', 401);
  }
}