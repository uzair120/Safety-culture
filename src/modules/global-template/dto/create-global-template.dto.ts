import { UpdateTemplateItemDto } from '../../../modules/template-items/dto';
import { CreateTemplateDto, UpdateTemplateDto } from '../../../modules/template/dto';
import { CreateTemplateItemQuestionDto } from './template-item-question.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGlobalTemplateDto {
  @ApiProperty()
  template: UpdateTemplateDto;

  @ApiProperty()
  templateItems: CreateTemplateItemQuestionDto[];
}
