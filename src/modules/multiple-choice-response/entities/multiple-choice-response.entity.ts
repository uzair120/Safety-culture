import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CustomBaseEntity } from '../../../common/entity/base.entity';
import { Question } from '../../questions/entities/question.entity';
import { Options as OptionEntity } from '../../options/entities/options.entity';

@Entity({ name: 'multi_choice_response' })
export class ChoiceResponse extends CustomBaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ name: 'question_id', type: 'int', nullable: false })
  @IsNumber()
  @IsNotEmpty()
  questionId: number;

  @Column({ type: 'varchar', length: 255, nullable: true, default: 'MCQs' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ name: 'is_global', type: 'boolean', default: false })
  @IsBoolean()
  isGlobal: boolean;

  @Column({ name: 'multi_select', type: 'boolean', default: false })
  @IsBoolean()
  multiSelect: boolean;

  @ManyToOne(() => Question, (question) => question.multiChoiceResponse, {
    nullable: true,
  })
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @OneToMany(() => OptionEntity, (options) => options.multiChoiceResponse, { eager: true })
  options: OptionEntity[];
}
