"use strict";

exports.__esModule = true;
exports.CategoriesInMemoryRepository = void 0;

var _category = require("../../infra/typeorm/entities/category.entity");

/**
 * to be able to test our business rules, we need to
 * create a fake/in-memory repository, since unit test
 * should not be aware/connect with the database.
 */
class CategoriesInMemoryRepository {
  constructor() {
    this.categories = [];
  }

  async findByName(name) {
    return this.categories.find(category => category.name === name);
  }

  async list() {
    return this.categories;
  }

  async create({
    description,
    name
  }) {
    const category = new _category.Category();
    Object.assign(category, {
      description,
      name
    });
    this.categories.push(category);
  }

}

exports.CategoriesInMemoryRepository = CategoriesInMemoryRepository;