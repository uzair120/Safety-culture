import { Module } from '@nestjs/common';
import { GlobalTemplateService } from './global-template.service';
import { GlobalTemplateController } from './global-template.controller';
import { TemplateService } from '../template/template.service';
import { TemplateItemService } from '../template-items/template-items.service';
import { QuestionService } from '../questions/questions.service';
import { TemplateModule } from '../template/template.module';
import { TemplateItemsModule } from '../template-items/template-items.module';
import { QuestionsModule } from '../questions/questions.module';
import { WidgetsModule } from '../widgets/widgets.module';
import { WidgetValuesModule } from '../widget_values/widget_values.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '../questions/entities/question.entity';
import { WidgetValue } from '../widget_values/entities/widget_value.entity';

@Module({
  controllers: [GlobalTemplateController],
  providers: [GlobalTemplateService],
  imports: [
    TypeOrmModule.forFeature([WidgetValue]),
    TemplateModule,
    TemplateItemsModule,
    QuestionsModule,
    WidgetsModule,
    WidgetValuesModule,
  ],
})
export class GlobalTemplateModule {}
