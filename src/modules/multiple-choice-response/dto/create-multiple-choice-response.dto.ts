import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Options } from 'src/modules/options/entities/options.entity';

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

  @ApiProperty()
  options: Options[];
}
