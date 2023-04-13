/* istanbul ignore file */

import { ApiProperty } from '@nestjs/swagger';

export class SwaggerExceptionResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  data: unknown;

  @ApiProperty()
  error?: unknown;

  @ApiProperty({
    default: false,
  })
  success: boolean;

  @ApiProperty()
  stackTrace?: string;
}
