import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTemplateItemsTable1681705470046
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TYPE template_item_type AS ENUM ('PAGE', 'SECTION', 'QUESTION')
  `);
    await queryRunner.query(`
        CREATE TABLE template_items (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          type template_item_type NOT NULL,
          template_id INT NOT NULL,
          order_index INT NOT NULL,
          parent_id INT,
  
          status BOOLEAN DEFAULT true,
  
          created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          deleted_at TIMESTAMP(6) NULL DEFAULT NULL
        );
      `);

    await queryRunner.query(`
      ALTER TABLE template_items
        ADD CONSTRAINT fk_template_items_template_id
        FOREIGN KEY (template_id)
        REFERENCES templates(id)
        ON DELETE CASCADE
    `);

    await queryRunner.query(`
        ALTER TABLE template_items ADD CONSTRAINT FK_template_items_template_item_parent
          FOREIGN KEY (parent_id)
          REFERENCES template_items (id)
          ON DELETE CASCADE;
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE template_items
        DROP CONSTRAINT fk_template_items_template_id
  `);
    await queryRunner.query(`
    ALTER TABLE template_items DROP CONSTRAINT FK_template_items_template_item_parent;
  `);

    await queryRunner.query(`
    DROP TABLE template_items;
  `);
  }
}
