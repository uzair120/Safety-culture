import { Test, TestingModule } from '@nestjs/testing';
import { TemplateItemsController } from './template-items.controller';
import { TemplateItemService } from './template-items.service';

describe('TemplateItemsController', () => {
  let controller: TemplateItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplateItemsController],
      providers: [TemplateItemService],
    }).compile();

    controller = module.get<TemplateItemsController>(TemplateItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
