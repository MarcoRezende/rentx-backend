"use strict";

exports.__esModule = true;
exports.secretToken = exports.secretRefreshToken = exports.expiresRefreshTokenDays = exports.expiresInToken = exports.expiresInRefreshToken = exports.default = void 0;
const secretToken = '70080aa08b4fe2b66aae3baea7e4a99f';
exports.secretToken = secretToken;
const expiresInToken = '1d';
exports.expiresInToken = expiresInToken;
const secretRefreshToken = '1463ccd2104eeb36769180b8a0c86bb6';
exports.secretRefreshToken = secretRefreshToken;
const expiresInRefreshToken = '30d';
exports.expiresInRefreshToken = expiresInRefreshToken;
const expiresRefreshTokenDays = 30;
exports.expiresRefreshTokenDays = expiresRefreshTokenDays;
var _default = {
  secretToken,
  expiresInToken,
  secretRefreshToken,
  expiresInRefreshToken,
  expiresRefreshTokenDays
};
exports.default = _default;