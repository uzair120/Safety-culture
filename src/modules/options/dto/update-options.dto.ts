import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOptionsDto } from './create-options.dto';
import { IsNumber } from 'class-validator';

export class UpdateOptionsDto extends PartialType(CreateOptionsDto) {
  @ApiProperty()
  @IsNumber()
  id: number;
}
