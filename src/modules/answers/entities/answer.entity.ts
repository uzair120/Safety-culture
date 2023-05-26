import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CustomBaseEntity } from '../../../common/entity/base.entity';
import { Question } from '../../questions/entities/question.entity';
import { InspectionMeta } from '../../inspection-meta/entities/inspection-meta.entity';

@Entity({ name: 'answers' })
export class Answer extends CustomBaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ name: 'question_id', type: 'int', nullable: false })
  @IsNumber()
  @IsNotEmpty()
  questionId: number;

  @Column({ name: 'inspection_meta_id', type: 'int', nullable: false })
  @IsNumber()
  @IsNotEmpty()
  inspectionMetaId: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  value: string;

  @Column({ type: 'int', nullable: false })
  @IsNumber()
  version: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  notes: string;

  @Column({ name: 'question_title', type: 'varchar', length: 255 })
  @IsString()
  @IsOptional()
  questionTitle: string;

  @Column({ name: 'question_color', type: 'varchar', length: 255 })
  @IsString()
  @IsOptional()
  questionColor: string;

  @ManyToOne(() => Question, (question) => question.answers, {
    nullable: false,
  })
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @ManyToOne(() => InspectionMeta, (inspectionMeta) => inspectionMeta.answers, {
    nullable: false,
  })
  @JoinColumn({ name: 'inspection_meta_id' })
  inspectionMeta: InspectionMeta;
}
