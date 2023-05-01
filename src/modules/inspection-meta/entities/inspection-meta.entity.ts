import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber, IsNotEmpty, IsDate } from 'class-validator';
import { CustomBaseEntity } from 'src/common';
import { Template } from 'src/modules/template/entities/template.entity';
import { Answer } from 'src/modules/answers/entities/answer.entity';

@Entity({ name: 'inspection_meta' })
export class InspectionMeta extends CustomBaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ name: 'template_id', type: 'int', nullable: false })
  @IsNumber()
  @IsNotEmpty()
  templateId: number;

  @Column({ name: 'inspected_by', type: 'int', nullable: false })
  @IsNumber()
  @IsNotEmpty()
  inspectedBy: number;

  @Column({ name: 'inspected_on', type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP(6)' })
  @IsDate()
  @IsNotEmpty()
  inspectedOn: Date;

  @OneToOne(() => Template, (template) => template.inspectionMeta, {
    nullable: false,
  })
  @JoinColumn({ name: 'template_id' })
  template: Template;

  @OneToMany(() => Answer, (answer) => answer.inspectionMeta, { eager: true })
  answers?: Answer[];
}
