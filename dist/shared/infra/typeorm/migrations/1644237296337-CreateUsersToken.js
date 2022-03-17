"use strict";

exports.__esModule = true;
exports.CreateUsersToken1644237296337 = void 0;

var _typeorm = require("typeorm");

class CreateUsersToken1644237296337 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'users_tokens',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'refreshToken',
        type: 'varchar'
      }, {
        name: 'userId',
        type: 'uuid'
      }, {
        name: 'expiresDate',
        type: 'timestamp'
      }, {
        name: 'createdAt',
        type: 'timestamp',
        default: 'now()'
      }],
      foreignKeys: [{
        name: 'FKUserToken',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['userId'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('users_tokens');
  }

}

exports.CreateUsersToken1644237296337 = CreateUsersToken1644237296337;