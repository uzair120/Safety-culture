import { MigrationInterface, QueryRunner } from 'typeorm';

export class createChoiceResponsesTable1682010006909 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE multi_choice_response (
          id SERIAL PRIMARY KEY,
          question_id INT DEFAULT NULL,
          name VARCHAR(255) DEFAULT 'MCQs',
          is_global BOOLEAN DEFAULT false,
          multi_select BOOLEAN DEFAULT false,
          template_id INT DEFAULT NULL,

          created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          deleted_at TIMESTAMP(6) NULL DEFAULT NULL
        );
      `);

    await queryRunner.query(`
        ALTER TABLE multi_choice_response
        ADD CONSTRAINT fk_multi_choice_response_question_id
        FOREIGN KEY (question_id)
        REFERENCES questions(id)
        ON DELETE CASCADE
    `);

    await queryRunner.query(`
        ALTER TABLE multi_choice_response
        ADD CONSTRAINT fk_multi_choice_response_template_id
        FOREIGN KEY (template_id)
        REFERENCES templates(id)
        ON DELETE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE multi_choice_response
        DROP CONSTRAINT fk_multi_choice_response_template_id
    `);

    await queryRunner.query(`
        ALTER TABLE multi_choice_response
        DROP CONSTRAINT fk_multi_choice_response_question_id
    `);

    await queryRunner.query(`
        DROP TABLE multi_choice_response;
    `);
  }
}
