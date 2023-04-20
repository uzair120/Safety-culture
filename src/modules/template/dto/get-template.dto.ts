import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

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
  businessId: number;

  @ApiProperty()
  @IsNumber()
  createdBy: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  totalScore?: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  published: boolean;
}
