"use strict";

exports.__esModule = true;
exports.AuthenticateUserUseCase = void 0;

var _bcrypt = require("bcrypt");

var _jsonwebtoken = require("jsonwebtoken");

var _tsyringe = require("tsyringe");

var _auth = require("../../../../config/auth");

var _usersTokensRepository = require("../../repositories/users-tokens-repository.interface");

var _usersRepository = require("../../repositories/users.repository.interface");

var _dateProvider = require("../../../../shared/container/providers/date/date.provider.interface");

var _appError = require("../../../../shared/errors/app-error");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let AuthenticateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersTokensRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('DayJsProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _usersRepository.IUsersRepository === "undefined" ? Object : _usersRepository.IUsersRepository, typeof _usersTokensRepository.IUsersTokensRepository === "undefined" ? Object : _usersTokensRepository.IUsersTokensRepository, typeof _dateProvider.IDateProvider === "undefined" ? Object : _dateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class AuthenticateUserUseCase {
  constructor(usersRepository, usersTokensRepository, dateProvider) {
    this.usersRepository = usersRepository;
    this.usersTokensRepository = usersTokensRepository;
    this.dateProvider = dateProvider;
  }

  async execute({
    email,
    password
  }) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new _appError.AppError('Password or email incorrect', 401);
    }

    const passwordMatched = await (0, _bcrypt.compare)(password, user.password);

    if (!passwordMatched) {
      throw new _appError.AppError('Password or email incorrect', 401);
    }

    const token = (0, _jsonwebtoken.sign)({}, _auth.secretToken, {
      subject: user.id,
      expiresIn: _auth.expiresInToken
    });
    const refreshToken = (0, _jsonwebtoken.sign)({
      email
    }, _auth.secretRefreshToken, {
      subject: user.id,
      expiresIn: _auth.expiresInRefreshToken
    });
    const refreshTokenExpiresDate = this.dateProvider.addDays(_auth.expiresRefreshTokenDays);
    await this.usersTokensRepository.create({
      expiresDate: refreshTokenExpiresDate,
      refreshToken,
      userId: user.id
    });
    return {
      token,
      refreshToken,
      user: {
        name: user.name,
        email: user.email
      }
    };
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;