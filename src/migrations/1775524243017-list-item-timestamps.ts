import { MigrationInterface, QueryRunner } from "typeorm";

export class ListItemTimestamps1775524243017 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE list_item
        ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    `);

    await queryRunner.query(`
        ALTER TABLE list_item
        ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    `);

    await queryRunner.query(`
        ALTER TABLE list_item
        ADD COLUMN deleted_at TIMESTAMP NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE list_item
        DROP COLUMN deleted_at
    `);

    await queryRunner.query(`
        ALTER TABLE list_item
        DROP COLUMN updated_at
    `);

    await queryRunner.query(`
        ALTER TABLE list_item
        DROP COLUMN created_at
    `);
  }
}
