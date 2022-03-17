"use strict";

exports.__esModule = true;
exports.SpecificationsRepository = void 0;

var _typeorm = require("typeorm");

var _specification = require("../entities/specification.entity");

class SpecificationsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_specification.Specification);
  }

  async create({
    name,
    description
  }) {
    const specification = this.repository.create({
      name,
      description
    });
    return this.repository.save(specification);
  }

  async list() {
    return this.repository.find();
  }

  async findByName(name) {
    return this.repository.findOne({
      name
    });
  }

  findByIds(ids) {
    return this.repository.findByIds(ids);
  }

}

exports.SpecificationsRepository = SpecificationsRepository;