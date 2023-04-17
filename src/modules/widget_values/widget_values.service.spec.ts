import { Test, TestingModule } from '@nestjs/testing';
import { WidgetValuesService } from './widget_values.service';

describe('WidgetValuesService', () => {
  let service: WidgetValuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WidgetValuesService],
    }).compile();

    service = module.get<WidgetValuesService>(WidgetValuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
