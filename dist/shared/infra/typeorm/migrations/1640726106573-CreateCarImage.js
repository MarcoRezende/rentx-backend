"use strict";

exports.__esModule = true;
exports.CreateCarImage1640726106573 = void 0;

var _typeorm = require("typeorm");

class CreateCarImage1640726106573 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'car_image',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'carId',
        type: 'uuid'
      }, {
        name: 'imageUrl',
        type: 'varchar'
      }, {
        name: 'createdAt',
        type: 'timestamp',
        default: 'now()'
      }],
      foreignKeys: [{
        name: 'FKCarImage',
        referencedTableName: 'cars',
        referencedColumnNames: ['id'],
        columnNames: ['carId'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('car_image');
  }

}

exports.CreateCarImage1640726106573 = CreateCarImage1640726106573;