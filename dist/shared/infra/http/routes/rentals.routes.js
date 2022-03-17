"use strict";

exports.__esModule = true;
exports.rentalsRouter = void 0;

var _express = require("express");

var _createRental = require("../../../../modules/rentals/use-cases/create-rental/create-rental.controller");

var _devolutionRental = require("../../../../modules/rentals/use-cases/devolution-rental/devolution-rental.controller");

var _listRentals = require("../../../../modules/rentals/use-cases/list-rentals/list-rentals.controller");

var _ensureAdmin = require("../middlewares/ensure-admin");

var _ensureAuthenticated = require("../middlewares/ensure-authenticated");

const rentalsRouter = (0, _express.Router)();
exports.rentalsRouter = rentalsRouter;
const createRentalController = new _createRental.CreateRentalController();
const devolutionRentalController = new _devolutionRental.DevolutionRentalController();
const listRentalsController = new _listRentals.ListRentalsController();
rentalsRouter.post('/', _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createRentalController.handle);
rentalsRouter.post('/devolution/:id', _ensureAuthenticated.ensureAuthenticated, devolutionRentalController.handle);
rentalsRouter.post('/user', _ensureAuthenticated.ensureAuthenticated, listRentalsController.handle);