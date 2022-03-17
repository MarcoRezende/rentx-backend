"use strict";

exports.__esModule = true;
exports.CarImagesRepository = void 0;

var _typeorm = require("typeorm");

var _carImage = require("../entities/car-image.entity");

class CarImagesRepository {
  constructor() {
    this.repository = (0, _typeorm.getRepository)(_carImage.CarImage);
  }

  async create(carId, imageUrl) {
    return this.repository.save({ ...new _carImage.CarImage(),
      carId,
      imageUrl
    });
  }

}

exports.CarImagesRepository = CarImagesRepository;