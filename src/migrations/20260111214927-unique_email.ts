import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqueEmail1768176095902 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE UNIQUE INDEX  user_email ON member (email)",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE member DROP CONSTRAINT user_email");
  }
}
