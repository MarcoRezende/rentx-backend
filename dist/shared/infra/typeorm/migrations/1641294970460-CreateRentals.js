"use strict";

exports.__esModule = true;
exports.CreateRentals1641294970460 = void 0;

var _typeorm = require("typeorm");

class CreateRentals1641294970460 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'rentals',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'carId',
        type: 'uuid'
      }, {
        name: 'userId',
        type: 'uuid'
      }, {
        name: 'startDate',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'endDate',
        type: 'timestamp',
        isNullable: true
      }, {
        name: 'expectedReturnDate',
        type: 'timestamp'
      }, {
        name: 'total',
        type: 'numeric',
        isNullable: true
      }, {
        name: 'createdAt',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updatedAt',
        type: 'timestamp',
        default: 'now()'
      }],
      foreignKeys: [{
        name: 'FKCarRental',
        referencedTableName: 'cars',
        referencedColumnNames: ['id'],
        columnNames: ['carId'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      }, {
        name: 'FUserRental',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['userId'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('rentals');
  }

}

exports.CreateRentals1641294970460 = CreateRentals1641294970460;