import { Test, TestingModule } from '@nestjs/testing';
import { ToanhaController } from './toanha.controller';
import { ToanhaService } from './toanha.service';

describe('ToanhaController', () => {
  let controller: ToanhaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToanhaController],
      providers: [ToanhaService],
    }).compile();

    controller = module.get<ToanhaController>(ToanhaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
