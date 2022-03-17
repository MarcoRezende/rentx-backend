"use strict";

exports.__esModule = true;
exports.S3StorageProvider = void 0;

var _awsSdk = require("aws-sdk");

var _fs = _interopRequireDefault(require("fs"));

var _mime = require("mime");

var _path = require("path");

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class S3StorageProvider {
  constructor() {
    this.client = void 0;
    this.client = new _awsSdk.S3({
      region: process.env.AWS_BUCKET_REGION
    });
  }

  async save(file, folder) {
    const filePath = (0, _path.resolve)(_upload.default.tmpFolder, file);
    const fileContent = await _fs.default.promises.readFile(filePath);
    const ContentType = (0, _mime.getType)(filePath);
    await this.client.putObject({
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType
    }).promise();
    await _fs.default.promises.unlink(filePath);
    return file;
  }

  async delete(file, folder) {
    await this.client.deleteObject({
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      Key: file
    }).promise();
  }

}

exports.S3StorageProvider = S3StorageProvider;