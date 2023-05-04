import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateChoiceResponseDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  questionId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsBoolean()
  isGlobal: boolean;

  @ApiProperty()
  @IsBoolean()
  multiSelect: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  templateId: number;
}
