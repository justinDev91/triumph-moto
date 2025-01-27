import { Test, TestingModule } from '@nestjs/testing';
import { ConcessionService } from './concession.service';

describe('ConcessionService', () => {
  let service: ConcessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConcessionService],
    }).compile();

    service = module.get<ConcessionService>(ConcessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
