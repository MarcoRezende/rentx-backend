"use strict";

exports.__esModule = true;
exports.SendForgotPasswordMailUseCase = void 0;

var _path = require("path");

var _tsyringe = require("tsyringe");

var _uuid = require("uuid");

var _usersTokensRepository = require("../../repositories/users-tokens-repository.interface");

var _usersRepository = require("../../repositories/users.repository.interface");

var _dateProvider = require("../../../../shared/container/providers/date/date.provider.interface");

var _mailProvider = require("../../../../shared/container/providers/mail/mail.provider.interface");

var _appError = require("../../../../shared/errors/app-error");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;

let SendForgotPasswordMailUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersTokensRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('DayJsProvider')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('EtherealProvider')(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _usersRepository.IUsersRepository === "undefined" ? Object : _usersRepository.IUsersRepository, typeof _usersTokensRepository.IUsersTokensRepository === "undefined" ? Object : _usersTokensRepository.IUsersTokensRepository, typeof _dateProvider.IDateProvider === "undefined" ? Object : _dateProvider.IDateProvider, typeof _mailProvider.IMailProvider === "undefined" ? Object : _mailProvider.IMailProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = class SendForgotPasswordMailUseCase {
  constructor(usersRepository, usersTokensRepository, dateProvider, mailProvider) {
    this.usersRepository = usersRepository;
    this.usersTokensRepository = usersTokensRepository;
    this.dateProvider = dateProvider;
    this.mailProvider = mailProvider;
  }

  async execute(email) {
    const user = await this.usersRepository.findByEmail(email);
    const templatePath = (0, _path.resolve)(__dirname, '..', '..', 'views', 'emails', 'forgot-password.hbs');

    if (!user) {
      throw new _appError.AppError('User does not exist!');
    }

    const token = (0, _uuid.v4)();
    const expiresDate = this.dateProvider.addHours(3);
    await this.usersTokensRepository.create({
      userId: user.id,
      refreshToken: token,
      expiresDate
    });
    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`
    };
    await this.mailProvider.sendMail(email, 'Recuperação de senha', variables, templatePath);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.SendForgotPasswordMailUseCase = SendForgotPasswordMailUseCase;