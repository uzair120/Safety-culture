import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CustomBaseEntity } from 'src/common/entity/base.entity';
import { TemplateItem } from '../../template-items/entities/template-item.entity';
import { Widget } from '../../widgets/entities/widget.entity';

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

  @ManyToOne(() => TemplateItem, (item) => item.questions, {
    nullable: false,
  })
  @JoinColumn({ name: 'item_id' })
  item: TemplateItem;

  @ManyToOne(() => Widget, (widget) => widget.questions, {
    nullable: false,
  })
  @JoinColumn({ name: 'widget_id' })
  widget: Widget;
}
