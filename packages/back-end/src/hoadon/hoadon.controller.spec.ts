import { Test, TestingModule } from '@nestjs/testing';
import { HoadonController } from './hoadon.controller';
import { HoadonService } from './hoadon.service';

describe('HoadonController', () => {
  let controller: HoadonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HoadonController],
      providers: [HoadonService],
    }).compile();

    controller = module.get<HoadonController>(HoadonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
