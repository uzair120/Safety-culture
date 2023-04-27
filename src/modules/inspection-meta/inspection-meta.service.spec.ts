import { Test, TestingModule } from '@nestjs/testing';
import { InspectionMetaService } from './inspection-meta.service';

describe('InspectionMetaService', () => {
  let service: InspectionMetaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InspectionMetaService],
    }).compile();

    service = module.get<InspectionMetaService>(InspectionMetaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
