import { MigrationInterface, QueryRunner } from 'typeorm';

export class addQuestionTitleColumnAnswersTable1682939790030 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER table answers ADD COLUMN question_title VARCHAR (255) DEFAULT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER table answers DROP COLUMN question_title`);
  }
}
