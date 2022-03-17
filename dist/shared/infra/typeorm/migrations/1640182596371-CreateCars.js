"use strict";

exports.__esModule = true;
exports.CreateCars1640182596371 = void 0;

var _typeorm = require("typeorm");

class CreateCars1640182596371 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'cars',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'description',
        type: 'varchar'
      }, {
        name: 'dailyRate',
        type: 'numeric'
      }, {
        name: 'available',
        type: 'boolean',
        default: true
      }, {
        name: 'licensePlate',
        type: 'varchar'
      }, {
        name: 'fineAmount',
        type: 'numeric'
      }, {
        name: 'brand',
        type: 'varchar'
      }, {
        name: 'categoryId',
        type: 'uuid',
        isNullable: true
      }, {
        name: 'createdAt',
        type: 'timestamp',
        default: 'now()'
      }],

      /**
       * creates a foreign key to a column - a relations between two
       * tables - and configure it.
       */
      foreignKeys: [{
        name: 'FKCategoryCar',

        /**
         * the parent table that has the target column (id)
         */
        referencedTableName: 'categories',
        referencedColumnNames: ['id'],

        /**
         * the column in here to be mapped and assume
         * the foreign key (id) value.
         */
        columnNames: ['categoryId'],

        /**
         * actions to be executed when the foreign key suffers
         * a modification (delete or update) in the parent table.
         */
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('cars');
  }

}

exports.CreateCars1640182596371 = CreateCars1640182596371;