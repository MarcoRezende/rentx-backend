"use strict";

exports.__esModule = true;
exports.CreateSpecificationsCars1640714690104 = void 0;

var _typeorm = require("typeorm");

class CreateSpecificationsCars1640714690104 {
  async up(queryRunner) {
    await queryRunner.createTable(
    /**
     * since this is a relations table, the record
     * id it's not necessary.
     *
     * this makes creating its entity unnecessary as well
     */
    new _typeorm.Table({
      name: 'specifications_cars',
      columns: [{
        name: 'specificationId',
        type: 'uuid'
      }, {
        name: 'carId',
        type: 'uuid'
      }, {
        name: 'createdAt',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
    await queryRunner.createForeignKey('specifications_cars', new _typeorm.TableForeignKey({
      name: 'FKSpecificationCar',
      referencedTableName: 'specifications',
      referencedColumnNames: ['id'],
      columnNames: ['specificationId'],
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL'
    }));
    await queryRunner.createForeignKey('specifications_cars', new _typeorm.TableForeignKey({
      name: 'FKCarSpecification',
      referencedTableName: 'cars',
      referencedColumnNames: ['id'],
      columnNames: ['carId'],
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('specifications_cars', 'FKCarSpecification');
    await queryRunner.dropForeignKey('specifications_cars', 'FKSpecificationCar');
    await queryRunner.dropTable('specifications_cars');
  }

}

exports.CreateSpecificationsCars1640714690104 = CreateSpecificationsCars1640714690104;