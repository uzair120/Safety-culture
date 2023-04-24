import { MigrationInterface, QueryRunner } from 'typeorm';

export enum WidgetType {
  SITE = 'SITE',
  DOCUMENT = 'DOCUMENT',
  TEXT_ANSWER = 'TEXT_ANSWER',
  NUMBER = 'NUMBER',
  CHECKBOX = 'CHECKBOX',
  DATE_TIME = 'DATE_TIME',
  MEDIA = 'MEDIA',
  SLIDER = 'SLIDER',
  ANNOTATION = 'ANNOTATION',
  SIGNATURE = 'SIGNATURE',
  LOCATION = 'LOCATION',
  INSTRUCTION = 'INSTRUCTION',
}

export class AddWidgets1682336259084 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const widgets = Object.values(WidgetType).map((type) => ({
      name: type,
      type: type,
      disabled: false,
    }));

    await queryRunner.manager.createQueryBuilder().insert().into('widgets').values(widgets).execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const widgetNames = Object.values(WidgetType)
      .map((type) => `'${type}'`)
      .join(', ');

    await queryRunner.manager.createQueryBuilder().delete().from('widgets').where(`name IN (${widgetNames})`).execute();
  }
}
