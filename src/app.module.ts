import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CoreModule } from './common/core.module';
import { TemplateModule } from './modules/template/template.module';
import { TemplateItemsModule } from './modules/template-items/template-items.module';

import { WidgetsModule } from './modules/widgets/widgets.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { WidgetValuesModule } from './modules/widget_values/widget_values.module';
import { ChoiceResponsesModule } from './modules/multiple-choice-response/multiple-choice-response.module';
import { OptionsModule } from './modules/options/options.module';
import { GlobalTemplateModule } from './modules/global-template/global-template.module';
import { AnswersModule } from './modules/answers/answers.module';
import { InspectionMetaModule } from './modules/inspection-meta/inspection-meta.module';

@Module({
  imports: [
    CoreModule,
    TemplateModule,
    WidgetsModule,
    TemplateItemsModule,
    QuestionsModule,
    WidgetValuesModule,
    ChoiceResponsesModule,
    OptionsModule,
    GlobalTemplateModule,
    AnswersModule,
    InspectionMetaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
