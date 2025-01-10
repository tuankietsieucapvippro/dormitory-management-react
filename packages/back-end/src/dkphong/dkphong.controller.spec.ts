import { Test, TestingModule } from '@nestjs/testing';
import { DkphongController } from './dkphong.controller';
import { DkphongService } from './dkphong.service';

describe('DkphongController', () => {
  let controller: DkphongController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DkphongController],
      providers: [DkphongService],
    }).compile();

    controller = module.get<DkphongController>(DkphongController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
