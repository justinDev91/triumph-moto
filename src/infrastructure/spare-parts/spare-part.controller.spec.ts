import { Test, TestingModule } from '@nestjs/testing';
import { SpartPartController } from './spare-part.controller';

describe('SpartPartController', () => {
  let controller: SpartPartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpartPartController],
    }).compile();

    controller = module.get<SpartPartController>(SpartPartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
