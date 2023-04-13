import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CoreModule } from './common/core.module';
import { TemplateModule } from './modules/template/template.module';

@Module({
  imports: [CoreModule, TemplateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
