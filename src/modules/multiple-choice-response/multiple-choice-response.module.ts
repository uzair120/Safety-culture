import { Module } from '@nestjs/common';
import { ChoiceResponseService } from './multiple-choice-response.service';
import { ChoiceResponseController } from './multiple-choice-response.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChoiceResponse } from './entities/multiple-choice-response.entity';
import { OptionsModule } from '../options/options.module';

@Module({
  imports: [TypeOrmModule.forFeature([ChoiceResponse]), OptionsModule],
  controllers: [ChoiceResponseController],
  providers: [ChoiceResponseService],
  exports: [ChoiceResponseService],
})
export class ChoiceResponsesModule {}
