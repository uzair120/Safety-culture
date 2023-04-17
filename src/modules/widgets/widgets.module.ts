import { Module } from '@nestjs/common';
import { WidgetService } from './widgets.service';
import { WidgetsController } from './widgets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Widget } from './entities/widget.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Widget])],
  controllers: [WidgetsController],
  providers: [WidgetService],
})
export class WidgetsModule {}
