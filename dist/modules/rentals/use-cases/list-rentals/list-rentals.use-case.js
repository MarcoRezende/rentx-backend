"use strict";

exports.__esModule = true;
exports.ListRentalsUseCase = void 0;

var _tsyringe = require("tsyringe");

var _rentalsRepository = require("../../repositories/rentals-repository.interface");

var _dec, _dec2, _dec3, _class;

let ListRentalsUseCase = (_dec = function (target, key) {
  return (0, _tsyringe.inject)('RentalsRepository')(target, undefined, 0);
}, _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [typeof _rentalsRepository.IRentalsRepository === "undefined" ? Object : _rentalsRepository.IRentalsRepository]), _dec(_class = _dec2(_class = _dec3(_class = class ListRentalsUseCase {
  constructor(rentalsRepository) {
    this.rentalsRepository = rentalsRepository;
  }

  async execute(userId) {
    return this.rentalsRepository.listByUser(userId);
  }

}) || _class) || _class) || _class);
exports.ListRentalsUseCase = ListRentalsUseCase;