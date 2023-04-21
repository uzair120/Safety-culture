import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { CustomBaseEntity } from '../../../common/entity/base.entity';
import { Question } from '../../../modules/questions/entities/question.entity';

@Entity({ name: 'widgets' })
export class Widget extends CustomBaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ type: 'varchar', nullable: false })
  @IsString()
  @IsNotEmpty()
  type: string;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  disabled: boolean;

  @OneToMany(() => Question, (question) => question.widget, { eager: false })
  questions: Question[];
}
