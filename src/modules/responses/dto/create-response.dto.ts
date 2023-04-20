// create-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateResponseDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  responsesNameId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty()
  @IsBoolean()
  isGlobal: boolean;

  @ApiProperty()
  @IsBoolean()
  multiSelect: boolean;
}
