import { Test, TestingModule } from '@nestjs/testing';
import { MotorcycleTrialController } from './motorcycle-trial.controller';

describe('MotorcycleTrialController', () => {
  let controller: MotorcycleTrialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotorcycleTrialController],
    }).compile();

    controller = module.get<MotorcycleTrialController>(MotorcycleTrialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
