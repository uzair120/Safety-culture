import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTemplateItemDto } from './create-template-item.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateTemplateItemDto extends PartialType(CreateTemplateItemDto) {
  @IsOptional()
  @ApiProperty()
  @IsNumber()
  id?: number;
}
