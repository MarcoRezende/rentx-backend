"use strict";

exports.__esModule = true;
exports.UsersInMemoryRepository = void 0;

var _user = require("../../infra/typeorm/entities/user.entity");

class UsersInMemoryRepository {
  constructor() {
    this.users = [];
  }

  async create({
    driverLicense,
    email,
    password,
    name
  }) {
    const user = new _user.User();
    Object.assign(user, {
      driverLicense,
      email,
      password,
      name
    });
    this.users.push(user);
  }

  async findByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  async findById(id) {
    return this.users.find(user => user.id === id);
  }

  async saveAvatar(userId, fileName) {
    const userIndex = this.users.findIndex(user => user.id === userId);
    this.users[userIndex] = { ...this.users[userIndex],
      avatarUrl: fileName
    };
  }

}

exports.UsersInMemoryRepository = UsersInMemoryRepository;