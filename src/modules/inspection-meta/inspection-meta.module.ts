import { Module } from '@nestjs/common';
import { InspectionMetaService } from './inspection-meta.service';
import { InspectionMetaController } from './inspection-meta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InspectionMeta } from './entities/inspection-meta.entity';
import { AnswersModule } from '../answers/answers.module';
import { QuestionsModule } from '../questions/questions.module';
import { TemplateItemsModule } from '../template-items/template-items.module';

@Module({
  imports: [TypeOrmModule.forFeature([InspectionMeta]), AnswersModule, QuestionsModule, TemplateItemsModule],
  controllers: [InspectionMetaController],
  providers: [InspectionMetaService],
})
export class InspectionMetaModule {}
