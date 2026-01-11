import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateList1767142800000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE list (
        id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        member_id bigint,
        list_category_id bigint,
        FOREIGN KEY (member_id) REFERENCES member(id),
        FOREIGN KEY (list_category_id) REFERENCES list_category(id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE list");
  }
}
