import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsDate, IsOptional } from 'class-validator';
import { CreateAnswerDto } from 'src/modules/answers/dto';

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

  @ApiProperty()
  @IsDate()
  @IsOptional()
  createAnswerDto?: CreateAnswerDto[];
}
