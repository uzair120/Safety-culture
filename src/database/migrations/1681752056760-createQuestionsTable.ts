import { MigrationInterface, QueryRunner } from 'typeorm';

export class createQuestionsTable1681752056760 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE questions (
          id SERIAL PRIMARY KEY,
          item_id INT NOT NULL,
          widget_id INT NOT NULL,
          format VARCHAR(255),
          required BOOLEAN DEFAULT false,
  
          created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          deleted_at TIMESTAMP(6) NULL DEFAULT NULL
        );
      `);

    await queryRunner.query(`
        ALTER TABLE questions
        ADD CONSTRAINT fk_questions_template_item_id
        FOREIGN KEY (item_id)
        REFERENCES template_items(id)
        ON DELETE CASCADE
    `);

    await queryRunner.query(`
        ALTER TABLE questions
        ADD CONSTRAINT fk_questions_widget_id
        FOREIGN KEY (widget_id)
        REFERENCES widgets(id)
        ON DELETE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE questions
        DROP CONSTRAINT fk_questions_template_item_id
    `);

    await queryRunner.query(`
        ALTER TABLE questions
        DROP CONSTRAINT fk_questions_widget_id
    `);

    await queryRunner.query(`
        DROP TABLE questions;
    `);
  }
}
