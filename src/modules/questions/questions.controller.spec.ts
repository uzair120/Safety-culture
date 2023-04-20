import { Test, TestingModule } from '@nestjs/testing';
import { QuestionController } from './questions.controller';
import { QuestionService } from './questions.service';

describe('QuestionsController', () => {
  let controller: QuestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionController],
      providers: [QuestionService],
    }).compile();

    controller = module.get<QuestionController>(QuestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
