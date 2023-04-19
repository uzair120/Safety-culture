import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

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

  @ApiProperty()
  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  businessId?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  createdBy?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  totalScore?: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  published?: boolean;
}
