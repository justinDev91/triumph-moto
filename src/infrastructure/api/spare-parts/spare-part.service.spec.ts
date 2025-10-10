import { Test, TestingModule } from '@nestjs/testing';
import { SpartPartService } from './spare-part.service';

describe('SpartPartService', () => {
  let service: SpartPartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpartPartService],
    }).compile();

    service = module.get<SpartPartService>(SpartPartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
