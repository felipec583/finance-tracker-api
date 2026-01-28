import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeItemIdNullableAndNewTextField1768953522894 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE list_item 
        ALTER column item_id DROP NOT NULL`);

    await queryRunner.query(`ALTER TABLE list_item
        ADD COLUMN free_text_name VARCHAR(255)`);

    await queryRunner.query(`ALTER TABLE list_item
        DROP CONSTRAINT list_item_item_id_list_id_key`);

    await queryRunner.query(`CREATE UNIQUE INDEX 
        list_item_unique_item
  ON list_item (list_id, item_id)
  WHERE item_id IS NOT NULL`);

    await queryRunner.query(`CREATE UNIQUE INDEX 
        list_item_unique_free_text
  ON list_item (list_id, free_text_name)
  WHERE free_text_name IS NOT NULL;`);

    await queryRunner.query(`ALTER TABLE list_item
        ADD CONSTRAINT item_name_ref_check 
        CHECK (
  (item_id IS NOT NULL AND free_text_name IS NULL)
  OR
  (item_id IS NULL AND free_text_name IS NOT NULL)
)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE list_item 
        ALTER column item_id SET NOT NULL`);

    await queryRunner.query(`ALTER TABLE list_item
        DROP COLUMN free_text_name`);

    await queryRunner.query(`ALTER TABLE list_item
            ADD CONSTRAINT list_item_item_id_list_id_key UNIQUE (item_id, list_id)`);

    await queryRunner.query(`DROP INDEX list_item_unique_free_text;`);

    await queryRunner.query(`DROP INDEX list_item_unique_item;`);

    await queryRunner.query(`ALTER TABLE list_item
        DROP CONSTRAINT item_name_ref_check`);
  }
}
