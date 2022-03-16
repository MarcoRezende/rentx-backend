import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixIsAdminType1640217129574 implements MigrationInterface {
  name = 'FixIsAdminType1640217129574';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "isAdmin"');
    await queryRunner.query(
      'ALTER TABLE "users" ADD "isAdmin" boolean NOT NULL DEFAULT false'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "isAdmin"');
    await queryRunner.query(
      'ALTER TABLE "users" ADD "isAdmin" character varying NOT NULL DEFAULT false'
    );
  }
}
