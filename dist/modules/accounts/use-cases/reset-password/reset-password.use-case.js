"use strict";

exports.__esModule = true;
exports.ResetPasswordUseCase = void 0;

var _bcrypt = require("bcrypt");

var _tsyringe = require("tsyringe");

var _usersTokensRepository = require("../../repositories/users-tokens-repository.interface");

var _usersRepository = require("../../repositories/users.repository.interface");

var _dateProvider = require("../../../../shared/container/providers/date/date.provider.interface");

var _appError = require("../../../../shared/errors/app-error");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let ResetPasswordUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersTokensRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('DayJsProvider')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _usersTokensRepository.IUsersTokensRepository === "undefined" ? Object : _usersTokensRepository.IUsersTokensRepository, typeof _dateProvider.IDateProvider === "undefined" ? Object : _dateProvider.IDateProvider, typeof _usersRepository.IUsersRepository === "undefined" ? Object : _usersRepository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ResetPasswordUseCase {
  constructor(usersTokensRepository, dateProvider, usersRepository) {
    this.usersTokensRepository = usersTokensRepository;
    this.dateProvider = dateProvider;
    this.usersRepository = usersRepository;
  }

  async execute({
    password,
    token
  }) {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new _appError.AppError('Token invalid!');
    }

    if (this.dateProvider.isBefore(userToken.expiresDate, this.dateProvider.now())) {
      throw new _appError.AppError('Token expired');
    }

    const user = await this.usersRepository.findById(userToken.userId);

    if (!user) {
      throw new _appError.AppError('User not found');
    }

    user.password = await (0, _bcrypt.hash)(password, 8);
    await this.usersRepository.create(user); // invalida o token recém utilizado

    await this.usersTokensRepository.deleteById(userToken.id);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.ResetPasswordUseCase = ResetPasswordUseCase;