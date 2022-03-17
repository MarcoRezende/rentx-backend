"use strict";

exports.__esModule = true;
exports.default = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _multer = _interopRequireDefault(require("multer"));

var _path = require("path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * usaremos um provider local para
 * testes, o qual utilizará esta pasta.
 */
const tmpFolder = (0, _path.resolve)(__dirname, '..', '..', 'tmp');
var _default = {
  tmpFolder,
  storage: _multer.default.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileName = `${_crypto.default.randomBytes(16).toString('hex')}-${file.originalname}`;
      return callback(null, fileName);
    }
  })
};
exports.default = _default;