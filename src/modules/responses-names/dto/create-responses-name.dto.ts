import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateResponsesNameDto {
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
}
