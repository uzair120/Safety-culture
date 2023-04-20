import { Test, TestingModule } from '@nestjs/testing';
import { McqsService } from './mcqs.service';

describe('McqsService', () => {
  let service: McqsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [McqsService],
    }).compile();

    service = module.get<McqsService>(McqsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
