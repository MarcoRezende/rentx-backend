"use strict";

exports.__esModule = true;
exports.ensureAdmin = ensureAdmin;

var _users = require("../../../../modules/accounts/infra/typeorm/repositories/users.repository");

var _appError = require("../../../errors/app-error");

async function ensureAdmin(request, _response, next) {
  const usersRepository = new _users.UsersRepository();
  const user = await usersRepository.findById(request.user?.id);

  if (!user?.isAdmin) {
    throw new _appError.AppError("User isn't an admin");
  }

  return next();
}