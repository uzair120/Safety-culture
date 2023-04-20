import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { CustomBaseEntity } from 'src/common/entity/base.entity';
import { TemplateItem } from 'src/modules/template-items/entities/template-item.entity';

@Entity({ name: 'templates' })
export class Template extends CustomBaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    default: 'Untitled Template',
  })
  @IsString()
  @MaxLength(255)
  title: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @Column({ type: 'varchar', length: 600, nullable: true })
  @IsOptional()
  @IsString()
  image: string;

  @Column({ name: 'business_id', type: 'int', nullable: true })
  @IsNumber()
  @IsOptional()
  businessId: number;

  @Column({ name: 'created_by', type: 'int', nullable: false })
  @IsNumber()
  @IsNotEmpty()
  createdBy: number;

  @Column({ name: 'total_score', type: 'int', nullable: true })
  @IsOptional()
  @IsNumber()
  totalScore?: number;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  published: boolean;

  @OneToMany(() => TemplateItem, (item) => item.template)
  templateItems: TemplateItem[];
}
