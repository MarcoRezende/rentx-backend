"use strict";

var _tsyringe = require("tsyringe");

var _localStorage = require("../implementations/local-storage.provider");

var _s = require("./implementations/s3.provider");

const diskStorage = {
  s3: _s.S3StorageProvider,
  local: _localStorage.LocalStorageProvider
};
const disk = process.env.disk ?? 'local';

_tsyringe.container.registerSingleton('StorageProvider', diskStorage[disk]);