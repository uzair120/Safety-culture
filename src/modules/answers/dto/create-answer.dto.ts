import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  questionId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  inspectionMetaId: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  value?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  version: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  notes?: string;
}
