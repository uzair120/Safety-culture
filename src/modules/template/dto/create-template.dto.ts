import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTemplateDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiProperty()
  @IsNumber()
  business_id: number;

  @ApiProperty()
  @IsNumber()
  created_by: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  total_score?: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  published: boolean;
}
