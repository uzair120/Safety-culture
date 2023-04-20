import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Template } from '../../template/entities/template.entity';

import { TemplateItemType } from '../enums';
import { CustomBaseEntity } from '../../../common';
import { Question } from '../../../modules/questions/entities/question.entity';

@Entity({ name: 'template_items' })
export class TemplateItem extends CustomBaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @Column({
    type: 'enum',
    enum: TemplateItemType,
    nullable: false,
  })
  @IsNotEmpty()
  @IsEnum(TemplateItemType)
  type: TemplateItemType;

  @Column({
    name: 'template_id',
    type: 'int',
    nullable: false,
  })
  @IsNumber()
  @IsNotEmpty()
  templateId: number;

  @Column({
    name: 'order_index',
    type: 'int',
    nullable: false,
  })
  @IsNumber()
  @IsNotEmpty()
  orderIndex: number;

  @Column({
    name: 'parent_id',
    type: 'int',
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  parentId?: number;

  @Column({
    type: 'boolean',
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @ManyToOne(() => Template, (template) => template.templateItems)
  @JoinColumn({
    name: 'template_id',
  })
  template: Template;

  @OneToMany(() => Question, (question) => question.item, { eager: true })
  questions: Question[];
}
