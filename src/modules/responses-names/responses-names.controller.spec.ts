import { Test, TestingModule } from '@nestjs/testing';
import { ResponsesNameController } from './responses-names.controller';
import { ResponsesNameService } from './responses-names.service';

describe('ResponsesNameController', () => {
  let controller: ResponsesNameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResponsesNameController],
      providers: [ResponsesNameService],
    }).compile();

    controller = module.get<ResponsesNameController>(ResponsesNameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
