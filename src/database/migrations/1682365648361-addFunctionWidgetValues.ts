import { MigrationInterface, QueryRunner } from 'typeorm';

export class addFunctionWidgetValues1682365648361 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        
    CREATE OR REPLACE FUNCTION insert_widget_value(
        in_question_id INTEGER,
        in_attribute_name VARCHAR(255),
        in_attribute_value VARCHAR(255)
    )
    RETURNS VOID
    AS $$
    BEGIN
        -- check if the combination of question_id and attribute_name already exists
        IF NOT EXISTS (SELECT 1 FROM widget_values WHERE question_id = in_question_id AND attribute_name = in_attribute_name AND deleted_at IS NULL)
        THEN
            -- if it doesn't exist, insert the new data
            INSERT INTO widget_values (question_id, attribute_name, attribute_value)
            VALUES (in_question_id, in_attribute_name, in_attribute_value);
        ELSE
            -- if it already exists, update the attribute_value
            UPDATE widget_values
            SET attribute_value = in_attribute_value, updated_at = NOW()
            WHERE question_id = in_question_id AND attribute_name = in_attribute_name AND deleted_at IS NULL;
        END IF;
    END;
    $$ LANGUAGE plpgsql;
    
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP FUNCTION IF EXISTS insert_widget_value(
        in_question_id INTEGER,
        in_attribute_name VARCHAR(255),
        in_attribute_value VARCHAR(255)
    );
`);
  }
}
