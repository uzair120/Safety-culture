import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsDate } from 'class-validator';

export class CreateInspectionMetaDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  templateId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  inspectedBy: number;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  inspectedOn: Date;
}
