import { Test, TestingModule } from '@nestjs/testing';
import { TaikhoanController } from './taikhoan.controller';
import { TaikhoanService } from './taikhoan.service';

describe('TaikhoanController', () => {
  let controller: TaikhoanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaikhoanController],
      providers: [TaikhoanService],
    }).compile();

    controller = module.get<TaikhoanController>(TaikhoanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
