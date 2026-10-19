import { MigrationInterface, QueryRunner } from "typeorm";

export class DateColumnsInList1771118629037 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE list 
            ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
        `);

    await queryRunner.query(`
            ALTER TABLE list 
            ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
        `);

    await queryRunner.query(`
            ALTER TABLE list 
            ADD COLUMN deleted_at TIMESTAMP NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE list 
            DROP COLUMN deleted_at
        `);

    await queryRunner.query(`
            ALTER TABLE list 
            DROP COLUMN updated_at
        `);

    await queryRunner.query(`
            ALTER TABLE list 
            DROP COLUMN created_at
        `);
  }
}
