import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto<T> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({ type: [Object] })
  @IsNotEmpty()
  data: T[];

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  success = true;
}
