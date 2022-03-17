"use strict";

exports.__esModule = true;
exports.BaseInMemoryRepository = void 0;

class BaseInMemoryRepository {
  async findById(id, entities) {
    return entities.find(entity => entity.id === id);
  }

}

exports.BaseInMemoryRepository = BaseInMemoryRepository;