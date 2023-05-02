import { Module } from '@nestjs/common';
import { ChoiceResponseService } from './multiple-choice-response.service';
import { ChoiceResponseController } from './multiple-choice-response.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChoiceResponse } from './entities/multiple-choice-response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChoiceResponse])],
  controllers: [ChoiceResponseController],
  providers: [ChoiceResponseService],
})
export class ChoiceResponsesModule {}
