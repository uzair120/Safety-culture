import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { CreateChoiceResponseDto } from './create-multiple-choice-response.dto';

export class GetChoiceResponseByTemplateDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  id?: number;
}
