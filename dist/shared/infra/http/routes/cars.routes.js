"use strict";

exports.__esModule = true;
exports.carsRouter = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _createCarSpecifications = require("../../../../modules/cars/use-cases/create-car-specifications/create-car-specifications.controller");

var _createCar = require("../../../../modules/cars/use-cases/create-car/create-car.controller");

var _listAvailableCars = require("../../../../modules/cars/use-cases/list-available-cars/list-available-cars.controller");

var _uploadCarImages = require("../../../../modules/cars/use-cases/upload-car-images/upload-car-images.controller");

var _ensureAdmin = require("../middlewares/ensure-admin");

var _ensureAuthenticated = require("../middlewares/ensure-authenticated");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const carsRouter = (0, _express.Router)();
exports.carsRouter = carsRouter;
const createCarController = new _createCar.CreateCarController();
const createCarSpecificationsController = new _createCarSpecifications.CreateCarSpecificationsController();
const listAvailableCarsController = new _listAvailableCars.ListAvailableCarsController();
const uploadCarImagesController = new _uploadCarImages.UploadCarImagesController();
const upload = (0, _multer.default)(_upload.default);
carsRouter.post('/', _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCarController.handle);
carsRouter.get('/available', listAvailableCarsController.handle);
carsRouter.post('/specifications/:id', _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCarSpecificationsController.handle);
carsRouter.post('/:id/images', _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, upload.array('images'), uploadCarImagesController.handle);