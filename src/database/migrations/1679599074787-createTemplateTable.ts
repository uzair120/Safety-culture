import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTemplateTable1679599074787 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE template (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                createdAt TIMESTAMP WITH TIME ZONE DEFAULT now(),
                updatedAt TIMESTAMP WITH TIME ZONE DEFAULT now()
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE template;
        `);
  }
}
