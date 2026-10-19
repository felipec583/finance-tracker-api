import { MigrationInterface, QueryRunner } from "typeorm";

export class QuantityDefaultAndPriceCol1771103317464 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Update existing rows with null quantity to have value 1
    await queryRunner.query(`
      UPDATE list_item 
      SET quantity = 1 
      WHERE quantity IS NULL
    `);

    // Add default value of 1 to quantity column
    await queryRunner.query(`
      ALTER TABLE list_item 
      ALTER COLUMN quantity SET DEFAULT 1
    `);

    // Add new price column with default 0 and nullable
    await queryRunner.query(`
      ALTER TABLE list_item 
      ADD COLUMN price DECIMAL(10,2) DEFAULT 0
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove the price column
    await queryRunner.query(`
      ALTER TABLE list_item 
      DROP COLUMN price
    `);

    // Remove default value from quantity column
    await queryRunner.query(`
      ALTER TABLE list_item 
      ALTER COLUMN quantity DROP DEFAULT
    `);
  }
}
