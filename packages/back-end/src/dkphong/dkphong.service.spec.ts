import { Test, TestingModule } from '@nestjs/testing';
import { DkphongService } from './dkphong.service';

describe('DkphongService', () => {
  let service: DkphongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DkphongService],
    }).compile();

    service = module.get<DkphongService>(DkphongService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
