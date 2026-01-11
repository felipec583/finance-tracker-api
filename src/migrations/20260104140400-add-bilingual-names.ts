import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBilingualNames20260104140400 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE item
      RENAME COLUMN name TO name_en
    `);
    await queryRunner.query(`
      ALTER TABLE item
      ADD COLUMN name_es VARCHAR(255) NOT NULL
    `);

    await queryRunner.query(`
      ALTER TABLE item_category
      ADD COLUMN name_en VARCHAR(255) NOT NULL
    `);
    await queryRunner.query(`
      ALTER TABLE item_category
      ADD COLUMN name_es VARCHAR(255) NOT NULL
    `);

    await queryRunner.query(`
      ALTER TABLE list_category
      RENAME COLUMN name TO name_en
    `);
    await queryRunner.query(`
      ALTER TABLE list_category
      ADD COLUMN name_es VARCHAR(255) NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // list_category table: rename name_en back to name, drop name_es
    await queryRunner.query(`
      ALTER TABLE list_category
      DROP COLUMN name_es
    `);
    await queryRunner.query(`
      ALTER TABLE list_category
      RENAME COLUMN name_en TO name
    `);

    // item_category table: drop name_en and name_es
    await queryRunner.query(`
      ALTER TABLE item_category
      DROP COLUMN name_es
    `);
    await queryRunner.query(`
      ALTER TABLE item_category
      DROP COLUMN name_en
    `);

    // item table: rename name_en back to name, drop name_es
    await queryRunner.query(`
      ALTER TABLE item
      DROP COLUMN name_es
    `);
    await queryRunner.query(`
      ALTER TABLE item
      RENAME COLUMN name_en TO name
    `);
  }
}
