import { PartialType } from '@nestjs/swagger';
import { CreateGlobalTemplateDto } from './create-global-template.dto';

export class UpdateGlobalTemplateDto extends PartialType(CreateGlobalTemplateDto) {}
