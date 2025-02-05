import { Module } from '@nestjs/common';
import { MaintenanceController } from './maintenance.controller';
import { MaintenanceService } from './maintenance.service';
import { MaintenanceRepositoryImpleme } from '@infrastructure/adapters/maintenance.repository.implem';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Maintenance } from './maintenance.entity';
import { MotorcycleModule } from '@infrastructure/motorcycles/motorcycle.module';
import { ConcessionModule } from '@infrastructure/concessions/concession.module';
import { Motorcycle } from '@infrastructure/motorcycles/motorcycle.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Maintenance, Motorcycle]),
    MotorcycleModule,
    ConcessionModule
  ],
  controllers: [MaintenanceController],
  providers: [
    MaintenanceService,
    MaintenanceRepositoryImpleme
  ],
  exports: [
    MaintenanceService,
    MaintenanceRepositoryImpleme
  ]
})
export class MaintenanceModule {}
