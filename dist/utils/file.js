"use strict";

exports.__esModule = true;
exports.deleteFile = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const deleteFile = async filePath => {
  try {
    /**
     * checa se o arquivo existe, se não
     * dispara um erro.
     */
    await _fs.default.promises.stat(filePath);
  } catch {
    return;
  }

  await _fs.default.promises.unlink(filePath);
};

exports.deleteFile = deleteFile;