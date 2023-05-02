import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateChoiceResponseDto } from './create-multiple-choice-response.dto';

export class UpdateChoiceResponseDto extends PartialType(CreateChoiceResponseDto) {
  @ApiProperty()
  @IsNumber()
  id: number;
}
