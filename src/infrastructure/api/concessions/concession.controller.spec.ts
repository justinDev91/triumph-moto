import { Test, TestingModule } from '@nestjs/testing';
import { ConcessionController } from './concession.controller';

describe('ConcessionController', () => {
  let controller: ConcessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcessionController],
    }).compile();

    controller = module.get<ConcessionController>(ConcessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
