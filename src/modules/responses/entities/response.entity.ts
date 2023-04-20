// responses.entity.ts
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CustomBaseEntity } from '../../../common/entity/base.entity';
import { ResponsesName } from '../../responses-names/entities/responses-name.entity';

@Entity({ name: 'responses' })
export class Response extends CustomBaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ name: 'responses_name_id', type: 'int', nullable: false })
  @IsNumber()
  @IsNotEmpty()
  responsesNameId: number;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  value: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  color: string;

  @Column({ name: 'is_global', type: 'boolean', default: false })
  @IsBoolean()
  isGlobal: boolean;

  @Column({ name: 'multi_select', type: 'boolean', default: false })
  @IsBoolean()
  multiSelect: boolean;

  @ManyToOne(() => ResponsesName, (responsesName) => responsesName.responses, {
    nullable: false,
  })
  @JoinColumn({ name: 'responses_name_id' })
  responsesName: ResponsesName;
}
