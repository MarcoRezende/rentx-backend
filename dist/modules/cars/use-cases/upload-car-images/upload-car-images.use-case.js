"use strict";

exports.__esModule = true;
exports.UploadCarImagesUseCase = void 0;

var _tsyringe = require("tsyringe");

var _carImagesRepository = require("../../repositories/car-images.repository.interface");

var _storageProvider = require("../../../../shared/container/providers/storage/storage.provider.interface");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let UploadCarImagesUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CarImagesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('StorageProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _carImagesRepository.ICarImagesRepository === "undefined" ? Object : _carImagesRepository.ICarImagesRepository, typeof _storageProvider.IStorageProvider === "undefined" ? Object : _storageProvider.IStorageProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UploadCarImagesUseCase {
  constructor(carImagesRepository, storageProvider) {
    this.carImagesRepository = carImagesRepository;
    this.storageProvider = storageProvider;
  }

  async execute({
    carId,
    imagesUrl
  }) {
    imagesUrl.map(async image => {
      await this.carImagesRepository.create(carId, image);
      await this.storageProvider.save(image, 'cars');
    });
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.UploadCarImagesUseCase = UploadCarImagesUseCase;