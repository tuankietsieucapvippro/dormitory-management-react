import { Test, TestingModule } from '@nestjs/testing';
import { LoaiphongController } from './loaiphong.controller';
import { LoaiphongService } from './loaiphong.service';

describe('LoaiphongController', () => {
  let controller: LoaiphongController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoaiphongController],
      providers: [LoaiphongService],
    }).compile();

    controller = module.get<LoaiphongController>(LoaiphongController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
