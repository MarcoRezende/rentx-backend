"use strict";

exports.__esModule = true;
exports.CategoriesRepository = void 0;

var _typeorm = require("typeorm");

var _category = require("../entities/category.entity");

class CategoriesRepository {
  /**
   * repositório privado para que apenas os métodos assinados
   * na interface possam ser acessados.
   */
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_category.Category);
  }

  async create({
    name,
    description
  }) {
    const category = this.repository.create({
      name,
      description
    }); // essa é a forma de salvar/criar uma nova linha no DB

    await this.repository.save(category);
  }

  async list() {
    return this.repository.find();
  }

  async findByName(name) {
    /**
     * short syntax para findOne({ where: { name } })
     */
    return this.repository.findOne({
      name
    });
  }

}

exports.CategoriesRepository = CategoriesRepository;