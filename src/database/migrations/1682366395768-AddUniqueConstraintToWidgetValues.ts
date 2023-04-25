import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueConstraintToWidgetValues1682366395768 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE widget_values
            ADD CONSTRAINT unique_question_attribute
            UNIQUE (question_id, attribute_name)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE widget_values
            DROP CONSTRAINT unique_question_attribute
        `);
  }
}
