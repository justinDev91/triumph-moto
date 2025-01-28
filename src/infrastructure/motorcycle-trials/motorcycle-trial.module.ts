import { Module } from '@nestjs/common';
import { MotorcycleTrialController } from './motorcycle-trial.controller';
import { MotorcycleTrialService } from './motorcycle-trial.service';

@Module({
  controllers: [MotorcycleTrialController],
  providers: [MotorcycleTrialService]
})
export class MotorcycleTrialModule {}
