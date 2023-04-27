import { Test, TestingModule } from '@nestjs/testing';
import { MCQService } from './mcqs.service';

describe('McqsService', () => {
  let service: MCQService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MCQService],
    }).compile();

    service = module.get<MCQService>(MCQService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
