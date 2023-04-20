import { Module } from '@nestjs/common';
import { MCQService } from './mcqs.service';
import { MCQController } from './mcqs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MCQ } from './entities/mcq.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MCQ])],
  controllers: [MCQController],
  providers: [MCQService],
})
export class McqsModule {}
