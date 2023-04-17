import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
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
  order_index: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  parent_id?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
