"use strict";

exports.__esModule = true;
exports.router = void 0;

var _express = require("express");

var _authenticate = require("./authenticate.routes");

var _cars = require("./cars.routes");

var _categories = require("./categories.routes");

var _password = require("./password.routes");

var _rentals = require("./rentals.routes");

var _specifications = require("./specifications.routes");

var _users = require("./users.routes");

const router = (0, _express.Router)();
/**
 * configurando aqui, não precisamos reescrever
 * o recurso novamente no router em questão.
 */

exports.router = router;
router.use('/categories', _categories.categoriesRouter);
router.use('/specifications', _specifications.specificationsRouter);
router.use('/cars', _cars.carsRouter);
router.use('/users', _users.usersRouter);
router.use('/rentals', _rentals.rentalsRouter);
router.use('/password', _password.passwordRouter);
/**
 * acessa direto a rota /sessions
 */

router.use(_authenticate.authenticateRouter);