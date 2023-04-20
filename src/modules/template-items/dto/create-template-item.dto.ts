import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TemplateItemType } from '../enums';

export class CreateTemplateItemDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ enum: TemplateItemType })
  @IsNotEmpty()
  @IsEnum(TemplateItemType)
  type: TemplateItemType;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  templateId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  orderIndex: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  parentId?: number;

  @ApiProperty({ required: true })
  @IsNumber()
  template_id?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
