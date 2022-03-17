"use strict";

exports.__esModule = true;
exports.SpecificationsInMemoryRepository = void 0;

var _specification = require("../../infra/typeorm/entities/specification.entity");

class SpecificationsInMemoryRepository {
  constructor() {
    this.specifications = [];
  }

  async findByName(name) {
    throw new Error('Method not implemented.');
  }

  async list() {
    return this.specifications;
  }

  async create({
    description,
    name
  }) {
    const specification = { ...new _specification.Specification(),
      description,
      name
    };
    this.specifications.push(specification);
    return specification;
  }

  async findByIds(ids) {
    return this.specifications.filter(specification => ids.includes(specification.id));
  }

}

exports.SpecificationsInMemoryRepository = SpecificationsInMemoryRepository;