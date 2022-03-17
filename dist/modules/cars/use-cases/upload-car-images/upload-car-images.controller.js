"use strict";

exports.__esModule = true;
exports.UploadCarImagesController = void 0;

var _tsyringe = require("tsyringe");

var _uploadCarImages = require("./upload-car-images.use-case");

class UploadCarImagesController {
  async handle(request, response) {
    const {
      id: carId
    } = request.params;
    const images = request.files;

    const uploadCarImagesUseCase = _tsyringe.container.resolve(_uploadCarImages.UploadCarImagesUseCase);

    const imagesUrl = images?.map(image => image.filename);
    uploadCarImagesUseCase.execute({
      carId,
      imagesUrl
    });
    return response.status(201).send();
  }

}

exports.UploadCarImagesController = UploadCarImagesController;