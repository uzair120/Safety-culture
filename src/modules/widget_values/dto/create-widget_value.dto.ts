import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateWidgetValueDto {
  @IsOptional()
  @ApiProperty()
  @IsNumber()
  id?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  questionId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  attributeName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  attributeValue: string;
}
