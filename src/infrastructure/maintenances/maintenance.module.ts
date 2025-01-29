import { Module } from '@nestjs/common';
import { MaintenanceController } from './maintenance.controller';
import { MaintenanceService } from './maintenance.service';
import { MaintenanceRepositoryImpleme } from '@infrastructure/adapters/maintenance.repository.implem';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Maintenance } from './maintenance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Maintenance])],
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
