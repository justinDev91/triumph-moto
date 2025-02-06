import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { AppointmentRepositoryImplem } from '@adapters/appointment.repository.implem';
import { UsersModule } from '@api/users/users.module';
import { CompanyModule } from '@api/companies/company.module';
import { LocationModule } from '@api/locations/location.module';
import { MaintenanceModule } from '@api/maintenances/maintenance.module';
import { RepairModule } from '@api/repairs/repair.module';
import { MotorcycleTrialModule } from '@api/motorcycle-trials/motorcycle-trial.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    UsersModule,
    CompanyModule,
    LocationModule,
    MaintenanceModule,
    RepairModule,
    MotorcycleTrialModule
  ],
  controllers: [AppointmentController],
  providers: [
    AppointmentService,
    AppointmentRepositoryImplem
  ],
  exports: [
    AppointmentService,
    AppointmentRepositoryImplem
  ]
})
export class AppointmentModule {}
