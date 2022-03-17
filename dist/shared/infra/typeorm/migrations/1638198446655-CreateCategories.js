"use strict";

exports.__esModule = true;
exports.CreateCategories1638198446655 = void 0;

var _typeorm = require("typeorm");

/**
 * migrations nos oferece uma forma de se manter atualizado
 * com o banco de dados mesmo trabalhando em equipe, cenario
 * o qual muitos devs constantemente realizam mudanças na database.
 *
 * migrations podem ser geradas conforme abaixo, manualmente
 * (typeorm migration:create -n migration_name), ou automaticamente
 * através de `typeorm migration:generate -n migration_name`.
 *
 * lembrando que estamos usando um ORM - TypeORM. O código
 * será convertido para a linguagem do banco, no caso postgres.
 *
 * o método `up` cria (migration:run), o `down` desfaz (migration:revert)
 * o realizado (é importante que ele aparece na ordem contrário a da criação).
 */
class CreateCategories1638198446655 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "categories",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true
      }, {
        name: "name",
        type: "varchar"
      }, {
        name: "description",
        type: "varchar"
      }, {
        name: "createdAt",
        type: "timestamp",
        default: "now()"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("categories");
  }

}

exports.CreateCategories1638198446655 = CreateCategories1638198446655;