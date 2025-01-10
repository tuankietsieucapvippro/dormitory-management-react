import { Test, TestingModule } from '@nestjs/testing';
import { ToanhaService } from './toanha.service';

describe('ToanhaService', () => {
  let service: ToanhaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToanhaService],
    }).compile();

    service = module.get<ToanhaService>(ToanhaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
