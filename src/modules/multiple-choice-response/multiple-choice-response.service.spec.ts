import { Test, TestingModule } from '@nestjs/testing';
import { ChoiceResponseService } from './multiple-choice-response.service';

describe('ChoiceResponseService', () => {
  let service: ChoiceResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChoiceResponseService],
    }).compile();

    service = module.get<ChoiceResponseService>(ChoiceResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
