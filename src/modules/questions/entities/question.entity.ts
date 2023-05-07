import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CustomBaseEntity } from '../../../common/entity/base.entity';
import { TemplateItem } from '../../template-items/entities/template-item.entity';
import { Widget } from '../../widgets/entities/widget.entity';
import { WidgetValue } from '../../../modules/widget_values/entities/widget_value.entity';
import { ChoiceResponse } from '../../multiple-choice-response/entities/multiple-choice-response.entity';
import { Answer } from 'src/modules/answers/entities/answer.entity';

@Entity({ name: 'questions' })
export class Question extends CustomBaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ name: 'item_id', type: 'int', nullable: false })
  @IsNumber()
  @IsNotEmpty()
  itemId: number;

  @Column({ name: 'widget_id', type: 'int', nullable: false })
  @IsNumber()
  @IsNotEmpty()
  widgetId: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsString()
  @IsNotEmpty()
  format: string;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  required: boolean;

  @OneToOne(() => TemplateItem, (item) => item.question, {
    nullable: false,
  })
  @JoinColumn({ name: 'item_id' })
  item: TemplateItem;

  @ManyToOne(() => Widget, (widget) => widget.questions, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'widget_id' })
  widget: Widget;

  @OneToMany(() => WidgetValue, (widgetValue) => widgetValue.question, { eager: true })
  values?: WidgetValue[];

  @OneToOne(() => ChoiceResponse, (choiceResponse) => choiceResponse.question, { nullable: true, eager: false })
  multiChoiceResponse?: ChoiceResponse[];

  @OneToMany(() => Answer, (answer) => answer.question, { eager: false })
  answers?: Answer[];
}
