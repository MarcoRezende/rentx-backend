"use strict";

exports.__esModule = true;
exports.RefreshTokenUseCase = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _tsyringe = require("tsyringe");

var _auth = require("../../../../config/auth");

var _usersTokensRepository = require("../../repositories/users-tokens-repository.interface");

var _dateProvider = require("../../../../shared/container/providers/date/date.provider.interface");

var _appError = require("../../../../shared/errors/app-error");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let RefreshTokenUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersTokensRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('DayJsProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _usersTokensRepository.IUsersTokensRepository === "undefined" ? Object : _usersTokensRepository.IUsersTokensRepository, typeof _dateProvider.IDateProvider === "undefined" ? Object : _dateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class RefreshTokenUseCase {
  constructor(usersTokensRepository, dateProvider) {
    this.usersTokensRepository = usersTokensRepository;
    this.dateProvider = dateProvider;
  }

  async execute(token) {
    const {
      email,
      sub: userId
    } = (0, _jsonwebtoken.verify)(token, _auth.secretRefreshToken);
    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(userId, token);

    if (!userToken) {
      throw new _appError.AppError('Refresh token does not exists!');
    }

    await this.usersTokensRepository.deleteById(userToken.id);
    const refreshToken = (0, _jsonwebtoken.sign)({
      email
    }, _auth.secretRefreshToken, {
      subject: userId,
      expiresIn: _auth.expiresInRefreshToken
    });
    const refreshTokenExpiresDate = this.dateProvider.addDays(_auth.expiresRefreshTokenDays);
    await this.usersTokensRepository.create({
      expiresDate: refreshTokenExpiresDate,
      refreshToken,
      userId
    });
    const newToken = (0, _jsonwebtoken.sign)({}, _auth.secretToken, {
      subject: userId,
      expiresIn: _auth.expiresInToken
    });
    return {
      token: newToken,
      refreshToken
    };
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.RefreshTokenUseCase = RefreshTokenUseCase;