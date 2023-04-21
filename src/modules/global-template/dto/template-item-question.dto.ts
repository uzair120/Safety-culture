import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateQuestionDto, UpdateQuestionDto } from '../../../modules/questions/dto';
import { CreateTemplateItemDto, UpdateTemplateItemDto } from '../../../modules/template-items/dto';

export class CreateTemplateItemQuestionDto extends PartialType(CreateTemplateItemDto) {
  @ApiProperty()
  question: CreateQuestionDto;
}
