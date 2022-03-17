"use strict";

exports.__esModule = true;
exports.UsersRepository = void 0;

var _typeorm = require("typeorm");

var _user = require("../entities/user.entity");

class UsersRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_user.User);
  }

  async create({
    name,
    email,
    password,
    driverLicense,
    avatarUrl,
    id
  }) {
    const user = this.repository.create({
      name,
      email,
      password,
      driverLicense,
      avatarUrl,
      id
    });
    await this.repository.save(user);
  }

  findByEmail(email) {
    return this.repository.findOne({
      email
    });
  }

  findById(id) {
    return this.repository.findOne(id);
  }

  saveAvatar(userId, fileName) {
    return this.repository.update(userId, {
      avatarUrl: fileName
    });
  }

}

exports.UsersRepository = UsersRepository;