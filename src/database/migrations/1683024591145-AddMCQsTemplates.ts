import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMCQsTemplates1683024591145 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    INSERT INTO multi_choice_response (name, is_global) values ('Template MCQs 1', true);
    INSERT INTO multi_choice_response (name, is_global) values ('Template MCQs 2', true);
    INSERT INTO multi_choice_response (name, is_global) values ('Template MCQs 3', true);
    INSERT INTO multi_choice_response (name, is_global) values ('Template MCQs 4', true);
    INSERT INTO multi_choice_response (name, is_global) values ('Template MCQs 5', true);

    INSERT INTO options (value,color, multi_choice_response_id) values('Good', '#13855f', 1);
    INSERT INTO options (value,color, multi_choice_response_id) values('Fair', '#ffb000', 1);
    INSERT INTO options (value,color, multi_choice_response_id) values('Poor', '#c60022', 1);
    INSERT INTO options (value,color, multi_choice_response_id) values('N/A', '#707070', 1);

    INSERT INTO options (value,color, multi_choice_response_id) values('Safe', '#13855f', 2);
    INSERT INTO options (value,color, multi_choice_response_id) values('At Risk', '#c60022', 2);
    INSERT INTO options (value,color, multi_choice_response_id) values('N/A', '#707070', 2);

    INSERT INTO options (value,color, multi_choice_response_id) values('Pass', '#13855f', 3);
    INSERT INTO options (value,color, multi_choice_response_id) values('Fail', '#c60022', 3);
    INSERT INTO options (value,color, multi_choice_response_id) values('N/A', '#707070', 3);

    INSERT INTO options (value,color, multi_choice_response_id) values('Yes', '#13855f', 4);
    INSERT INTO options (value,color, multi_choice_response_id) values('No', '#c60022', 4);
    INSERT INTO options (value,color, multi_choice_response_id) values('N/A', '#707070', 4);

    INSERT INTO options (value,color, multi_choice_response_id) values('Compliant', '#13855f', 5);
    INSERT INTO options (value,color, multi_choice_response_id) values('Non-Compliant', '#c60022', 5);
    INSERT INTO options (value,color, multi_choice_response_id) values('N/A', '#707070', 5);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
