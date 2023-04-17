import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CoreModule } from './common/core.module';
import { TemplateModule } from './modules/template/template.module';
import { TemplateItemsModule } from './modules/template-items/template-items.module';

@Module({
  imports: [CoreModule, TemplateModule, TemplateItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
