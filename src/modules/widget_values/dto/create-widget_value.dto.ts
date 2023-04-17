import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWidgetValueDto {
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
