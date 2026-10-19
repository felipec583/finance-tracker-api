import { MigrationInterface, QueryRunner } from "typeorm";

export class NameColumnInList1771119787837 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add name column to list table
    await queryRunner.query(`
            ALTER TABLE list 
            ADD COLUMN name VARCHAR(255) NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove name column from list table
    await queryRunner.query(`
            ALTER TABLE list 
            DROP COLUMN name
        `);
  }
}
