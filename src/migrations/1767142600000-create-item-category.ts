import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateItemCategory1767142600000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE item_category (
        id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE item_category");
  }
}
