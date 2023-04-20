import { PartialType } from '@nestjs/swagger';
import { CreateMCQDto } from './create-mcq.dto';

export class UpdateMCQDto extends PartialType(CreateMCQDto) {}
