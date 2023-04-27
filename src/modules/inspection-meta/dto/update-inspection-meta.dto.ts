import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { CreateInspectionMetaDto } from './create-inspection-meta.dto';

export class UpdateInspectionMetaDto extends PartialType(CreateInspectionMetaDto) {
  @IsOptional()
  @ApiProperty()
  @IsNumber()
  id?: number;
}
