import { Test, TestingModule } from '@nestjs/testing';
import { TemplateItemsController } from './template-items.controller';
import { TemplateItemsService } from './template-items.service';

describe('TemplateItemsController', () => {
  let controller: TemplateItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplateItemsController],
      providers: [TemplateItemsService],
    }).compile();

    controller = module.get<TemplateItemsController>(TemplateItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
