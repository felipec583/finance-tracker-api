import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateItem1767142700000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE item (
        id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        item_category_id bigint,
        FOREIGN KEY (item_category_id) REFERENCES item_category(id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE item");
  }
}
