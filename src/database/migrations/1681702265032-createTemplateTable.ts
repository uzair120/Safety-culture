import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTemplateTable1681702265032 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE templates (
              id SERIAL PRIMARY KEY,
              title VARCHAR(255) NOT NULL DEFAULT 'Untitled Template',
              description VARCHAR(500),
              business_id INT,
              created_by INT NOT NULL,
              total_score INT,
              published BOOLEAN DEFAULT false,
              image VARCHAR(500),
              created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
              updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
              deleted_at TIMESTAMP(6) NULL DEFAULT NULL
              
        )`,
    );
    await queryRunner.query(`
    ALTER TABLE templates ADD COLUMN template_unique_id uuid DEFAULT null;
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE templates DROP COLUMN template_unique_id;
  `);
    await queryRunner.query(`DROP TABLE templates`);
  }
}
