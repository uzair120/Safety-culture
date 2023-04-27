import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { CreateAnswerDto } from './create-answer.dto';

export class UpdateAnswerDto extends PartialType(CreateAnswerDto) {
  @IsOptional()
  @ApiProperty()
  @IsNumber()
  id?: number;
}
