import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { CreateWidgetValueDto } from './create-widget_value.dto';

export class UpdateWidgetValueDto extends PartialType(CreateWidgetValueDto) {
  @IsOptional()
  @ApiProperty()
  @IsNumber()
  id: number;
}
