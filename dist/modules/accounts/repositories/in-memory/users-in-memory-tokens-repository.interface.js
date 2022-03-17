"use strict";

exports.__esModule = true;
exports.UsersTokensInMemoryRepository = void 0;

var _userToken = require("../../infra/typeorm/entities/user-token");

class UsersTokensInMemoryRepository {
  constructor() {
    this.usersTokens = [];
  }

  async create({
    expiresDate,
    refreshToken,
    userId
  }) {
    const userToken = new _userToken.UserToken();
    Object.assign(userToken, {
      expiresDate,
      refreshToken,
      userId
    });
    this.usersTokens.push(userToken);
    return userToken;
  }

  async findByUserIdAndRefreshToken(userId, refreshToken) {
    return this.usersTokens.find(userToken => userToken.userId === userId && userToken.refreshToken === refreshToken);
  }

  async deleteById(id) {
    const userToken = this.usersTokens.find(userToken => userToken.id === id);

    if (userToken) {
      this.usersTokens.slice(this.usersTokens.indexOf(userToken));
    }
  }

  async findByRefreshToken(token) {
    return this.usersTokens.find(userToken => userToken.refreshToken);
  }

}

exports.UsersTokensInMemoryRepository = UsersTokensInMemoryRepository;