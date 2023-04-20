import { MigrationInterface, QueryRunner } from 'typeorm';

export class creatResponsesNamesTable1682013591690 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE responses_name (
          id SERIAL PRIMARY KEY,
          question_id INT NOT NULL,
          name VARCHAR(255) NOT NULL,
          is_global BOOLEAN DEFAULT false,
          multi_select BOOLEAN DEFAULT false,

          created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          deleted_at TIMESTAMP(6) NULL DEFAULT NULL
        );
      `);

    await queryRunner.query(`
        ALTER TABLE responses_name
        ADD CONSTRAINT fk_responses_name_question_id
        FOREIGN KEY (question_id)
        REFERENCES questions(id)
        ON DELETE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE responses_name
        DROP CONSTRAINT fk_responses_name_question_id
    `);

    await queryRunner.query(`
        DROP TABLE responses_name;
    `);
  }
}
