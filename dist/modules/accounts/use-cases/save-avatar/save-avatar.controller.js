"use strict";

exports.__esModule = true;
exports.SaveAvatarController = void 0;

var _tsyringe = require("tsyringe");

var _appError = require("../../../../shared/errors/app-error");

var _saveAvatar = require("./save-avatar.use-case");

class SaveAvatarController {
  async handle(request, response) {
    const {
      user: {
        id: userId
      }
    } = request;
    const avatarFile = request.file?.filename;

    if (!avatarFile) {
      throw new _appError.AppError('File required');
    }

    const saveAvatarUseCase = _tsyringe.container.resolve(_saveAvatar.SaveAvatarUseCase);

    await saveAvatarUseCase.execute({
      userId,
      avatarFile
    });
    response.status(204).send();
  }

}

exports.SaveAvatarController = SaveAvatarController;