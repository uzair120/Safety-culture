import { Test, TestingModule } from '@nestjs/testing';
import { MCQController } from './mcqs.controller';
import { MCQService } from './mcqs.service';

describe('McqsController', () => {
  let controller: MCQController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MCQController],
      providers: [MCQService],
    }).compile();

    controller = module.get<MCQController>(MCQController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
