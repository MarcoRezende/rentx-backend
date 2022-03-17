"use strict";

exports.__esModule = true;
exports.UserProfileController = void 0;

var _tsyringe = require("tsyringe");

var _userProfile = require("./user-profile.use-case");

class UserProfileController {
  async handle(request, response) {
    const {
      id
    } = request.user;

    const userProfileUseCase = _tsyringe.container.resolve(_userProfile.UserProfileUseCase);

    const user = await userProfileUseCase.execute(id);
    return response.json(user);
  }

}

exports.UserProfileController = UserProfileController;