import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString, isNumber } from 'class-validator';
import { CustomBaseEntity } from '../../../common/entity/base.entity';
import { ChoiceResponse } from '../../multiple-choice-response/entities/multiple-choice-response.entity';

@Entity({ name: 'options' })
export class Options extends CustomBaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsString()
  @IsNotEmpty()
  value: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  color: string;

  @Column({ name: 'multi_choice_response_id', type: 'int', nullable: false })
  @IsNumber()
  multiChoiceResponseId: number;

  @Column({ type: 'int', default: false })
  @IsNumber()
  score: number;

  @ManyToOne(() => ChoiceResponse, (choiceResponse) => choiceResponse.options)
  @JoinColumn({ name: 'multi_choice_response_id' })
  multiChoiceResponse: ChoiceResponse;
}
