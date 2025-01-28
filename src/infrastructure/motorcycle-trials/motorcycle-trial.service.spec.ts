import { Test, TestingModule } from '@nestjs/testing';
import { MotorcycleTrialService } from './motorcycle-trial.service';

describe('MotorcycleTrialService', () => {
  let service: MotorcycleTrialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MotorcycleTrialService],
    }).compile();

    service = module.get<MotorcycleTrialService>(MotorcycleTrialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
