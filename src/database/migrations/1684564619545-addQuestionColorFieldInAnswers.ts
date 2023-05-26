import { MigrationInterface, QueryRunner } from 'typeorm';

export class addQuestionColorFieldInAnswers1684564619545 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER table answers ADD COLUMN question_color VARCHAR (255) DEFAULT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER table answers DROP COLUMN question_title`);
  }
}
