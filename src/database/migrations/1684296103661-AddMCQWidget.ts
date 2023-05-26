import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMCQWidget1684296103661 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO widgets (name, type) values ('MCQs', 'MCQs');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
