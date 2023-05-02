import { Test, TestingModule } from '@nestjs/testing';
import { ChoiceResponseController } from './multiple-choice-response.controller';
import { ChoiceResponseService } from './multiple-choice-response.service';

describe('ChoiceResponseController', () => {
  let controller: ChoiceResponseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChoiceResponseController],
      providers: [ChoiceResponseService],
    }).compile();

    controller = module.get<ChoiceResponseController>(ChoiceResponseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
