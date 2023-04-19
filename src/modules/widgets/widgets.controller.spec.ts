import { Test, TestingModule } from '@nestjs/testing';
import { WidgetsController } from './widgets.controller';
import { WidgetService } from './widgets.service';

describe('WidgetsController', () => {
  let controller: WidgetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WidgetsController],
      providers: [WidgetService],
    }).compile();

    controller = module.get<WidgetsController>(WidgetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
