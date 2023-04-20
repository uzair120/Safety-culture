import { MigrationInterface, QueryRunner } from 'typeorm';

export class creatResponseTable1682015290950 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE responses (
          id SERIAL PRIMARY KEY,
          responses_name_id INT NOT NULL,
          value VARCHAR(255),
          color VARCHAR(255),
          is_global BOOLEAN DEFAULT false,
          multi_select BOOLEAN DEFAULT false,
  
          created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          deleted_at TIMESTAMP(6) NULL DEFAULT NULL
        );
      `);

    await queryRunner.query(`
        ALTER TABLE responses
        ADD CONSTRAINT fk_responses_responses_name_id
        FOREIGN KEY (responses_name_id)
        REFERENCES responses_names(id)
        ON DELETE CASCADE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE responses
        DROP CONSTRAINT fk_responses_responses_name_id;
    `);

    await queryRunner.query(`
        DROP TABLE responses;
    `);
  }
}
