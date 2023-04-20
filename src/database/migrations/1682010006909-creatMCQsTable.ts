import { MigrationInterface, QueryRunner } from 'typeorm';

export class creatMCQsTable1682010006909 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE mcqs (
          id SERIAL PRIMARY KEY,
          question_id INT NOT NULL,
          value VARCHAR(255) NOT NULL,
          color VARCHAR(255) NOT NULL,
          is_global BOOLEAN NOT NULL DEFAULT false,
          multi_select BOOLEAN NOT NULL DEFAULT false,
  
          created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          deleted_at TIMESTAMP(6) NULL DEFAULT NULL
        );
      `);

    await queryRunner.query(`
        ALTER TABLE mcqs
        ADD CONSTRAINT fk_mcqs_question_id
        FOREIGN KEY (question_id)
        REFERENCES questions(id)
        ON DELETE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE mcqs
        DROP CONSTRAINT fk_mcqs_question_id
    `);

    await queryRunner.query(`
        DROP TABLE mcqs;
    `);
  }
}
