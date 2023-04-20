import { Test, TestingModule } from '@nestjs/testing';
import { TemplateItemService } from './template-items.service';

describe('TemplateItemsService', () => {
  let service: TemplateItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateItemService],
    }).compile();

    service = module.get<TemplateItemService>(TemplateItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
