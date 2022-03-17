"use strict";

exports.__esModule = true;
exports.AlterUserAddAvatar1639492679039 = void 0;

var _typeorm = require("typeorm");

class AlterUserAddAvatar1639492679039 {
  constructor() {
    this.name = 'AlterUserAddAvatar1639492679039';
  }

  async up(queryRunner) {
    await queryRunner.addColumn('users', new _typeorm.TableColumn({
      name: 'avatarUrl',
      type: 'varchar',
      isNullable: true
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('users', 'avatarUrl');
  }

}

exports.AlterUserAddAvatar1639492679039 = AlterUserAddAvatar1639492679039;