import { Test, TestingModule } from '@nestjs/testing';
import { LoaiphongService } from './loaiphong.service';

describe('LoaiphongService', () => {
  let service: LoaiphongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoaiphongService],
    }).compile();

    service = module.get<LoaiphongService>(LoaiphongService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
