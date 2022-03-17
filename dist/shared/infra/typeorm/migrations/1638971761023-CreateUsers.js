"use strict";

exports.__esModule = true;
exports.CreateUsers1638971761023 = void 0;

var _typeorm = require("typeorm");

class CreateUsers1638971761023 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'users',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'email',
        type: 'varchar'
      }, {
        name: 'password',
        type: 'varchar'
      }, {
        name: 'username',
        type: 'varchar',
        isUnique: true
      }, {
        name: 'driverLicense',
        type: 'varchar'
      }, {
        name: 'isAdmin',
        type: 'varchar',
        default: false
      }, {
        name: 'createdAt',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('users');
  }

}

exports.CreateUsers1638971761023 = CreateUsers1638971761023;