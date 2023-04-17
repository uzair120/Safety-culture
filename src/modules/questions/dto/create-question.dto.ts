import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  itemId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  widgetId: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  format?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  required?: boolean;
}
