import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';
import { Template } from './entities/template.entity';
import { ChoiceResponsesModule } from '../multiple-choice-response/multiple-choice-response.module';

@Module({
  imports: [TypeOrmModule.forFeature([Template]), ChoiceResponsesModule],
  controllers: [TemplateController],
  providers: [TemplateService],
  exports: [TemplateService],
})
export class TemplateModule {}
