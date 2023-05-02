import { PartialType } from '@nestjs/swagger';
import { CreateOptionsDto } from './create-options.dto';

export class UpdateOptionsDto extends PartialType(CreateOptionsDto) {}
