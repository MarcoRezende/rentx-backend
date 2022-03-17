"use strict";

exports.__esModule = true;
exports.specificationsRouter = void 0;

var _express = require("express");

var _createSpecification = require("../../../../modules/cars/use-cases/create-specification/create-specification.controller");

var _listSpecifications = require("../../../../modules/cars/use-cases/list-specifications/list-specifications.controller");

var _ensureAdmin = require("../middlewares/ensure-admin");

var _ensureAuthenticated = require("../middlewares/ensure-authenticated");

const specificationsRouter = (0, _express.Router)();
exports.specificationsRouter = specificationsRouter;
const createSpecificationController = new _createSpecification.CreateSpecificationController();
const listSpecificationsController = new _listSpecifications.ListSpecificationsController();
specificationsRouter.post('/', _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createSpecificationController.handle);
specificationsRouter.get('/', listSpecificationsController.handle);