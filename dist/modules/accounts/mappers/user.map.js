"use strict";

exports.__esModule = true;
exports.UserMap = void 0;

var _classTransformer = require("class-transformer");

class UserMap {
  static toDto({
    driverLicense,
    email,
    id,
    name,
    avatarUrl,
    userAvatarUrl
  }) {
    return (0, _classTransformer.instanceToInstance)({
      driverLicense,
      email,
      avatarUrl,
      id,
      name,
      userAvatarUrl
    });
  }

}

exports.UserMap = UserMap;