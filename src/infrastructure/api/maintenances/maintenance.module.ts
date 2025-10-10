import { Module } from '@nestjs/common';
import { MaintenanceController } from './maintenance.controller';
import { MaintenanceService } from './maintenance.service';
import { MaintenanceRepositoryImpleme } from '@adapters/maintenance.repository.implem';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Maintenance } from './maintenance.entity';
import { MotorcycleModule } from '@api/motorcycles/motorcycle.module';
import { ConcessionModule } from '@api/concessions/concession.module';
import { Motorcycle } from '@api/motorcycles/motorcycle.entity';

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
