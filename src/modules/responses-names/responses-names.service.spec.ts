import { Test, TestingModule } from '@nestjs/testing';
import { ResponsesNameService } from './responses-names.service';

describe('ResponsesNameService', () => {
  let service: ResponsesNameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponsesNameService],
    }).compile();

    service = module.get<ResponsesNameService>(ResponsesNameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
