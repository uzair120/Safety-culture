import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { CustomBaseEntity } from '../../../common/entity/base.entity';
import { Question } from '../../questions/entities/question.entity';

@Entity({ name: 'widget_values' })
export class WidgetValue extends CustomBaseEntity {
  @Column({ name: 'question_id', type: 'int', unsigned: true })
  questionId: number;

  @Column({ name: 'attribute_name', type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  attributeName: string;

  @Column({ name: 'attribute_value', type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  attributeValue: string;

  @ManyToOne(() => Question, (question) => question.values, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'question_id' })
  question: Question;
}
