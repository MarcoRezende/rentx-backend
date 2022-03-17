"use strict";

exports.__esModule = true;
exports.authenticateRouter = void 0;

var _express = require("express");

var _authenticateUser = require("../../../../modules/accounts/use-cases/authenticate-user/authenticate-user.controller");

var _refreshTokenUse = require("../../../../modules/accounts/use-cases/refresh-token/refresh-token.use.controller");

const authenticateRouter = (0, _express.Router)();
exports.authenticateRouter = authenticateRouter;
const authenticateUserController = new _authenticateUser.AuthenticateUserController();
const refreshTokenUseController = new _refreshTokenUse.RefreshTokenUseController();
authenticateRouter.post('/sessions', authenticateUserController.handle);
authenticateRouter.post('/refresh-token', refreshTokenUseController.handle);