import { ApiProperty, PartialType } from '@nestjs/swagger';
import { UpdateQuestionDto } from '../../../modules/questions/dto';
import { UpdateTemplateItemDto } from '../../../modules/template-items/dto';

export class CreateTemplateItemQuestionDto extends PartialType(UpdateTemplateItemDto) {
  @ApiProperty()
  question: UpdateQuestionDto;
}
