import { MigrationInterface, QueryRunner } from 'typeorm';

export class createInspectionMetaTable1682612117451 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE inspection_meta (
          id SERIAL PRIMARY KEY,
          template_id INT NOT NULL,
          inspected_by INT NOT NULL,
          inspected_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

          created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          deleted_at TIMESTAMP(6) NULL DEFAULT NULL
        );
      `);

    await queryRunner.query(`
        ALTER TABLE inspection_meta
        ADD CONSTRAINT fk_inspection_meta_template_id
        FOREIGN KEY (template_id)
        REFERENCES templates(id)
        ON DELETE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE inspection_meta
        DROP CONSTRAINT fk_inspection_meta_template_id
    `);

    await queryRunner.query(`
        DROP TABLE inspection_meta;
    `);
  }
}
