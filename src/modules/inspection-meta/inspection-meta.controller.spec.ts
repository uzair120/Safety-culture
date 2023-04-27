import { Test, TestingModule } from '@nestjs/testing';
import { InspectionMetaController } from './inspection-meta.controller';
import { InspectionMetaService } from './inspection-meta.service';

describe('InspectionMetaController', () => {
  let controller: InspectionMetaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InspectionMetaController],
      providers: [InspectionMetaService],
    }).compile();

    controller = module.get<InspectionMetaController>(InspectionMetaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
