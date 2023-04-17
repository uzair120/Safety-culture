import { PartialType } from '@nestjs/swagger';
import { CreateTemplateItemDto } from './create-template-item.dto';

export class UpdateTemplateItemDto extends PartialType(CreateTemplateItemDto) {}
