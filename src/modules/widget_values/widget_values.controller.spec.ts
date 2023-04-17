import { Test, TestingModule } from '@nestjs/testing';
import { WidgetValuesController } from './widget_values.controller';
import { WidgetValuesService } from './widget_values.service';

describe('WidgetValuesController', () => {
  let controller: WidgetValuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WidgetValuesController],
      providers: [WidgetValuesService],
    }).compile();

    controller = module.get<WidgetValuesController>(WidgetValuesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
