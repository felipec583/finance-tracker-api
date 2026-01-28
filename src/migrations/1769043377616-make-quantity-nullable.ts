import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeQuantityNullable1769043377616 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE list_item 
        ALTER COLUMN quantity DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE list_item 
        ALTER COLUMN quantity DROP NOT  NULL`);
  }
}
