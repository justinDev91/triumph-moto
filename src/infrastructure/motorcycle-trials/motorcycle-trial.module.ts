import { Module } from '@nestjs/common';
import { MotorcycleTrialController } from './motorcycle-trial.controller';
import { MotorcycleTrialService } from './motorcycle-trial.service';
import { MotorcycleTrialRepositoryImplem } from '@infrastructure/adapters/motorcycle.trial.repository.implem';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotorcycleTrial } from './motorcycle-trial.entity';
import { Motorcycle } from '@infrastructure/motorcycles/motorcycle.entity';
import { Driver } from '@infrastructure/drivers/driver.entity';
import { MotorcycleModule } from '@infrastructure/motorcycles/motorcycle.module';
import { DriversModule } from '@infrastructure/drivers/drivers.module';

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
