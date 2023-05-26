import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetAllTemplates {
  @ApiProperty()
  @IsOptional()
  page?: number;

  @ApiProperty()
  @IsOptional()
  limit?: number;
}
