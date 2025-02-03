import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { AppointmentRepositoryImplem } from '@infrastructure/adapters/appointment.repository.implem';
import { UsersModule } from '@infrastructure/users/users.module';
import { CompanyModule } from '@infrastructure/companies/company.module';
import { LocationModule } from '@infrastructure/locations/location.module';
import { MaintenanceModule } from '@infrastructure/maintenances/maintenance.module';
import { RepairModule } from '@infrastructure/repairs/repair.module';
import { MotorcycleTrialModule } from '@infrastructure/motorcycle-trials/motorcycle-trial.module';
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
