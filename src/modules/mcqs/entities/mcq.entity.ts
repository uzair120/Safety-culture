import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CustomBaseEntity } from '../../../common/entity/base.entity';
import { Question } from '../../questions/entities/question.entity';

@Entity({ name: 'mcqs' })
export class MCQ extends CustomBaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ name: 'question_id', type: 'int', nullable: false })
  @IsNumber()
  @IsNotEmpty()
  questionId: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsString()
  @IsNotEmpty()
  value: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsString()
  @IsNotEmpty()
  color: string;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  isGlobal: boolean;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  multiSelect: boolean;

  @ManyToOne(() => Question, (question) => question.mcqs)
  @JoinColumn({ name: 'question_id' })
  question: Question;
}
