"use strict";

exports.__esModule = true;
exports.FixIsAdminType1640217129574 = void 0;

class FixIsAdminType1640217129574 {
  constructor() {
    this.name = 'FixIsAdminType1640217129574';
  }

  async up(queryRunner) {
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "isAdmin"');
    await queryRunner.query('ALTER TABLE "users" ADD "isAdmin" boolean NOT NULL DEFAULT false');
  }

  async down(queryRunner) {
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "isAdmin"');
    await queryRunner.query('ALTER TABLE "users" ADD "isAdmin" character varying NOT NULL DEFAULT false');
  }

}

exports.FixIsAdminType1640217129574 = FixIsAdminType1640217129574;