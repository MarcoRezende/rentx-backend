"use strict";

exports.__esModule = true;
exports.RefreshTokenUseController = void 0;

var _tsyringe = require("tsyringe");

var _refreshToken = require("./refresh-token.use-case");

class RefreshTokenUseController {
  async handle(request, response) {
    const token = request.body.token || request.headers['x-access-token'] || request.query.token;

    const refreshTokenUseCase = _tsyringe.container.resolve(_refreshToken.RefreshTokenUseCase);

    const refreshToken = await refreshTokenUseCase.execute(token);
    return response.json(refreshToken);
  }

}

exports.RefreshTokenUseController = RefreshTokenUseController;