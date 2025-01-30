import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { AppointmentRepositoryImplem } from '@infrastructure/adapters/appointment.repository.implem';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
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
