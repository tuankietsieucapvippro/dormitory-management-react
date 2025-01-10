import { Test, TestingModule } from '@nestjs/testing';
import { DiennuocController } from './diennuoc.controller';
import { DiennuocService } from './diennuoc.service';

describe('DiennuocController', () => {
  let controller: DiennuocController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiennuocController],
      providers: [DiennuocService],
    }).compile();

    controller = module.get<DiennuocController>(DiennuocController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
