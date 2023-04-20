import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CoreModule } from './common/core.module';
import { TemplateModule } from './modules/template/template.module';
import { TemplateItemsModule } from './modules/template-items/template-items.module';

import { WidgetsModule } from './modules/widgets/widgets.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { WidgetValuesModule } from './modules/widget_values/widget_values.module';
import { McqsModule } from './modules/mcqs/mcqs.module';

@Module({
  imports: [
    CoreModule,
    TemplateModule,
    WidgetsModule,
    TemplateItemsModule,
    QuestionsModule,
    WidgetValuesModule,
    McqsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
