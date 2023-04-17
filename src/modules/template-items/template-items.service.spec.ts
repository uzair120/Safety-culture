import { Test, TestingModule } from '@nestjs/testing';
import { TemplateItemsService } from './template-items.service';

describe('TemplateItemsService', () => {
  let service: TemplateItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateItemsService],
    }).compile();

    service = module.get<TemplateItemsService>(TemplateItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
