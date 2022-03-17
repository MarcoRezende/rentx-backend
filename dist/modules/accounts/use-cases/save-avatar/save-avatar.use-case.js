"use strict";

exports.__esModule = true;
exports.SaveAvatarUseCase = void 0;

var _tsyringe = require("tsyringe");

var _storageProvider = require("../../../../shared/container/providers/storage/storage.provider.interface");

var _appError = require("../../../../shared/errors/app-error");

var _users = require("../../infra/typeorm/repositories/users.repository");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let SaveAvatarUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('StorageProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _users.UsersRepository === "undefined" ? Object : _users.UsersRepository, typeof _storageProvider.IStorageProvider === "undefined" ? Object : _storageProvider.IStorageProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class SaveAvatarUseCase {
  constructor(usersRepository, storageProvider) {
    this.usersRepository = usersRepository;
    this.storageProvider = storageProvider;
  }

  async execute({
    userId,
    avatarFile
  }) {
    const user = await this.usersRepository.findById(userId);

    if (!user?.id) {
      throw new _appError.AppError('User not found');
    }

    if (user.avatarUrl) {
      await this.storageProvider.delete(avatarFile, 'avatar');
    }

    await this.storageProvider.save(avatarFile, 'avatar');
    user.avatarUrl = avatarFile;
    this.usersRepository.saveAvatar(user.id, avatarFile);
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.SaveAvatarUseCase = SaveAvatarUseCase;