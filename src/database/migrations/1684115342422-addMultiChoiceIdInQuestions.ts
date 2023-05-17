import { MigrationInterface, QueryRunner } from 'typeorm';

export class addMultiChoiceIdInQuestions1684115342422 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE questions
        ADD COLUMN multi_select BOOLEAN DEFAULT false
    `);

    // Add multi_choice_id as a foreign key to questions table
    await queryRunner.query(`
     ALTER TABLE questions
     ADD COLUMN multi_choice_id INT,
     ADD CONSTRAINT fk_questions_multi_choice_id
     FOREIGN KEY (multi_choice_id)
     REFERENCES multi_choice_response(id)
     ON DELETE CASCADE
 `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE questions
    DROP CONSTRAINT fk_questions_multi_choice_id,
    DROP COLUMN multi_choice_id
`);

    // Remove multi_select column from questions table
    await queryRunner.query(`
    ALTER TABLE questions
    DROP COLUMN multi_select
`);
  }
}
