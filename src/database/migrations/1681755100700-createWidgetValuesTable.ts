import { MigrationInterface, QueryRunner } from 'typeorm';

export class createWidgetValuesTable1681755100700 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE widget_values (
          id SERIAL PRIMARY KEY,
          question_id INT NOT NULL,
          attribute_name VARCHAR(255) NOT NULL,
          attribute_value VARCHAR(255) NOT NULL,
  
          created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          deleted_at TIMESTAMP(6) NULL DEFAULT NULL
        );
      `);
    await queryRunner.query(`
      ALTER TABLE widget_values
      ADD CONSTRAINT fk_widget_values_question_id
      FOREIGN KEY (question_id)
      REFERENCES questions (id)
      ON DELETE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE widget_values
        DROP CONSTRAINT fk_widget_values_question_id
    `);
    await queryRunner.query(`
    DROP TABLE widget_values;
`);
  }
}
