import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateResponseDto } from './create-response.dto';

export class UpdateResponseDto extends PartialType(CreateResponseDto) {
  @ApiProperty()
  id: number;
}
