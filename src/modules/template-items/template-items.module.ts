import { Module } from '@nestjs/common';
import { TemplateItemService } from './template-items.service';
import { TemplateItemsController } from './template-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateItem } from './entities/template-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TemplateItem])],
  controllers: [TemplateItemsController],
  providers: [TemplateItemService],
  exports: [TemplateItemService],
})
export class TemplateItemsModule {}
