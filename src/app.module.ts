import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CoreModule } from './common/core.module';
import { TemplateModule } from './modules/template/template.module';
import { TemplateItemsModule } from './modules/template-items/template-items.module';

import { WidgetsModule } from './modules/widgets/widgets.module';

@Module({
  imports: [CoreModule, TemplateModule, WidgetsModule, TemplateItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
