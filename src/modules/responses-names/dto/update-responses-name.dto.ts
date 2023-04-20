import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateResponsesNameDto } from './create-responses-name.dto';

export class UpdateResponsesNameDto extends PartialType(CreateResponsesNameDto) {
  @ApiProperty()
  @IsNumber()
  id: number;
}
