import { Module } from '@nestjs/common';
import { WidgetValuesService } from './widget_values.service';
import { WidgetValuesController } from './widget_values.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WidgetValue } from './entities/widget_value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WidgetValue])],
  controllers: [WidgetValuesController],
  providers: [WidgetValuesService],
  exports: [WidgetValuesService],
})
export class WidgetValuesModule {}
