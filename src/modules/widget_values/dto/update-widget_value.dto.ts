import { PartialType } from '@nestjs/swagger';
import { CreateWidgetValueDto } from './create-widget_value.dto';

export class UpdateWidgetValueDto extends PartialType(CreateWidgetValueDto) {}
