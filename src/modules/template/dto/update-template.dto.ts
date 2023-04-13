import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateTemplateDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty()
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  @ApiProperty()
  description?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  business_id?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  created_by?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  total_score?: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  published?: boolean;
}
