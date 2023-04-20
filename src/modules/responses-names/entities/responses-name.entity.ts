import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CustomBaseEntity } from '../../../common/entity/base.entity';
import { Question } from '../../questions/entities/question.entity';

@Entity({ name: 'responses_name' })
export class ResponsesName extends CustomBaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ name: 'question_id', type: 'int', nullable: false })
  @IsNumber()
  @IsNotEmpty()
  questionId: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ name: 'is_global', type: 'boolean', default: false })
  @IsBoolean()
  isGlobal: boolean;

  @Column({ name: 'multi_select', type: 'boolean', default: false })
  @IsBoolean()
  multiSelect: boolean;

  @ManyToOne(() => Question, (question) => question.responsesNames, {
    nullable: false,
  })
  @JoinColumn({ name: 'question_id' })
  question: Question;
}
