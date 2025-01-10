import { Test, TestingModule } from '@nestjs/testing';
import { DiennuocService } from './diennuoc.service';

describe('DiennuocService', () => {
  let service: DiennuocService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiennuocService],
    }).compile();

    service = module.get<DiennuocService>(DiennuocService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
