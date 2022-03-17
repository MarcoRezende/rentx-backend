"use strict";

exports.__esModule = true;
exports.usersRouter = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _userProfile = require("../../../../modules/accounts/use-cases/user-profile/user-profile.controller");

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _createUser = require("../../../../modules/accounts/use-cases/create-user/create-user.controller");

var _saveAvatar = require("../../../../modules/accounts/use-cases/save-avatar/save-avatar.controller");

var _ensureAuthenticated = require("../middlewares/ensure-authenticated");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRouter = (0, _express.Router)();
exports.usersRouter = usersRouter;
const createUserController = new _createUser.CreateUserController();
const saveAvatarController = new _saveAvatar.SaveAvatarController();
const userProfileController = new _userProfile.UserProfileController();
const uploadAvatar = (0, _multer.default)(_upload.default);
usersRouter.post('/', createUserController.handle);
usersRouter.patch('/avatar', _ensureAuthenticated.ensureAuthenticated, uploadAvatar.single('avatarFile'), saveAvatarController.handle);
usersRouter.get('/me', _ensureAuthenticated.ensureAuthenticated, userProfileController.handle);