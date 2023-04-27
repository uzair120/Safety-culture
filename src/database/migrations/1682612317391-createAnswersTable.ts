import { MigrationInterface, QueryRunner } from 'typeorm';

export class createAnswersTable1682612317391 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE answers (
          id SERIAL PRIMARY KEY,
          question_id INT NOT NULL,
          inspection_meta_id INT NOT NULL,
          value VARCHAR(255),
          version INT NOT NULL,
          notes VARCHAR(255),

          created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          deleted_at TIMESTAMP(6) NULL DEFAULT NULL
        );
    `);

    await queryRunner.query(`
        ALTER TABLE answers
        ADD CONSTRAINT fk_answers_question_id
        FOREIGN KEY (question_id)
        REFERENCES questions(id)
        ON DELETE CASCADE
    `);

    await queryRunner.query(`
        ALTER TABLE answers
        ADD CONSTRAINT fk_answers_inspection_meta_id
        FOREIGN KEY (inspection_meta_id)
        REFERENCES inspection_meta(id)
        ON DELETE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE answers
    DROP CONSTRAINT fk_answers_question_id
`);

    await queryRunner.query(`
    ALTER TABLE answers
    DROP CONSTRAINT fk_answers_inspection_meta_id
`);

    await queryRunner.query(`
    DROP TABLE answers;
`);
  }
}
