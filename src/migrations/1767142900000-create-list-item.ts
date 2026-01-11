import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateListItem1767142900000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE list_item (
        id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        item_id bigint NOT NULL,
        list_id bigint NOT NULL,
        quantity integer NOT NULL,
        FOREIGN KEY (item_id) REFERENCES item(id),
        FOREIGN KEY (list_id) REFERENCES list(id),
        UNIQUE (item_id, list_id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE list_item");
  }
}
