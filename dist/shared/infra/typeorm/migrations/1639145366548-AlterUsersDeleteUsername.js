"use strict";

exports.__esModule = true;
exports.AlterUsersDeleteUsername1639145366548 = void 0;

var _typeorm = require("typeorm");

class AlterUsersDeleteUsername1639145366548 {
  async up(queryRunner) {
    await queryRunner.dropColumn("users", "username");
  }

  async down(queryRunner) {
    await queryRunner.addColumn("users", new _typeorm.TableColumn({
      name: "username",
      type: "varchar",
      isUnique: true
    }));
  }

}

exports.AlterUsersDeleteUsername1639145366548 = AlterUsersDeleteUsername1639145366548;