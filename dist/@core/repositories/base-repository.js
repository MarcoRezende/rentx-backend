"use strict";

exports.__esModule = true;
exports.BaseRepository = void 0;

var _typeorm = require("typeorm");

class BaseRepository {
  async findById(id, entityTarget) {
    return (0, _typeorm.getManager)().findOne(id, entityTarget);
  }

}

exports.BaseRepository = BaseRepository;