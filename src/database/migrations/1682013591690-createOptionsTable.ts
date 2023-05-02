import { MigrationInterface, QueryRunner } from 'typeorm';

export class createOptionsTable1682013591690 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE options (
          id SERIAL PRIMARY KEY,
          value VARCHAR(255) NOT NULL,
          color VARCHAR(255) DEFAULT NULL,
          score INT DEFAULT NULL,
          multi_choice_response_id INT NOT NULL,
  
          created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          deleted_at TIMESTAMP(6) NULL DEFAULT NULL
        );
      `);

    await queryRunner.query(`
        ALTER TABLE options
        ADD CONSTRAINT fk_options_choice_response_id
        FOREIGN KEY (multi_choice_response_id)
        REFERENCES multi_choice_response(id)
        ON DELETE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE options
        DROP CONSTRAINT fk_options_choice_response_id
    `);

    await queryRunner.query(`
        DROP TABLE options;
    `);
  }
}
