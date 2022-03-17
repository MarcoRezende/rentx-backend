"use strict";

exports.__esModule = true;
exports.UsersTokensRepository = void 0;

var _typeorm = require("typeorm");

var _userToken = require("../entities/user-token");

class UsersTokensRepository {
  constructor() {
    this.repository = (0, _typeorm.getRepository)(_userToken.UserToken);
  }

  async create({
    expiresDate,
    refreshToken,
    userId
  }) {
    const token = this.repository.create({
      expiresDate,
      refreshToken,
      userId
    });
    return this.repository.save(token);
  }

  async findByUserIdAndRefreshToken(userId, refreshToken) {
    return this.repository.findOne({
      where: {
        userId,
        refreshToken
      }
    });
  }

  async deleteById(id) {
    this.repository.delete(id);
  }

  findByRefreshToken(refreshToken) {
    return this.repository.findOne({
      refreshToken
    });
  }

}

exports.UsersTokensRepository = UsersTokensRepository;