import { Module } from '@nestjs/common';
import { MotorcycleTrialController } from './motorcycle-trial.controller';
import { MotorcycleTrialService } from './motorcycle-trial.service';
import { MotorcycleTrialRepositoryImplem } from '@adapters/motorcycle.trial.repository.implem';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotorcycleTrial } from './motorcycle-trial.entity';
import { Motorcycle } from '@api/motorcycles/motorcycle.entity';
import { Driver } from '@api/drivers/driver.entity';
import { MotorcycleModule } from '@api/motorcycles/motorcycle.module';
import { DriversModule } from '@api/drivers/drivers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MotorcycleTrial, Motorcycle, Driver]),
    MotorcycleModule,
    DriversModule
  ],
  controllers: [MotorcycleTrialController],
  providers: [
    MotorcycleTrialService,
    MotorcycleTrialRepositoryImplem
  ],
  exports: [
    MotorcycleTrialService,
    MotorcycleTrialRepositoryImplem
  ]
})
export class MotorcycleTrialModule {}
