import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '@infrastructure/companies/company.entity';
import { Location } from '@infrastructure/locations/location.entity';
import { Maintenance } from '@infrastructure/maintenances/maintenance.entity';
import { MotorcycleTrial } from '@infrastructure/motorcycle-trials/motorcycle-trial.entity';
import { Repair } from '@infrastructure/repairs/repair.entity';
import { User } from '@infrastructure/users/user.entity';
import { faker } from '@faker-js/faker';
import { AppointmentStatusEnum } from '@infrastructure/types/AppointmentStatusEnum';
import { AppointmentReasonEnum } from '@infrastructure/types/AppointmentReasonEnum';
import { Appointment } from '@infrastructure/appointment/appointment.entity';

@Injectable()
export class AppointmentSeeder {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,

    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,

    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,

    @InjectRepository(Maintenance)
    private readonly maintenanceRepository: Repository<Maintenance>,

    @InjectRepository(MotorcycleTrial)
    private readonly motorcycleTrialRepository: Repository<MotorcycleTrial>,

    @InjectRepository(Repair)
    private readonly repairRepository: Repository<Repair>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seedAppointments(count: number = 10): Promise<void> {
    const companies = await this.companyRepository.find();
    const locations = await this.locationRepository.find();
    const maintenances = await this.maintenanceRepository.find();
    const motorcycleTrials = await this.motorcycleTrialRepository.find();
    const repairs = await this.repairRepository.find();
    const users = await this.userRepository.find();

    if (companies.length === 0 || users.length === 0) {
      console.log('No companies or users found in the database!');
      return;
    }

    const appointments: Appointment[] = [];

    for (let i = 0; i < count; i++) {
      const user = faker.helpers.arrayElement(users);
      const company = faker.helpers.arrayElement(companies);

      const appointmentStatus = faker.helpers.arrayElement([
        AppointmentStatusEnum.Scheduled,
        AppointmentStatusEnum.Cancelled,
        AppointmentStatusEnum.Completed,
        AppointmentStatusEnum.Pending,
      ]);

      const reason = faker.helpers.arrayElement([
        AppointmentReasonEnum.Location,
        AppointmentReasonEnum.Maintenance,
        AppointmentReasonEnum.Repair,
        AppointmentReasonEnum.MotorcycleTrial,
      ]);

      const startTime = faker.date.future();
      const endTime = new Date(startTime);
      endTime.setHours(startTime.getHours() + 100);

      let location = null;
      let maintenance = null;
      let repair = null;
      let motorcycleTrial = null;

      if (reason === AppointmentReasonEnum.Location) {
        location = faker.helpers.arrayElement(locations);
      } else if (reason === AppointmentReasonEnum.Maintenance) {
        maintenance = faker.helpers.arrayElement(maintenances);
      } else if (reason === AppointmentReasonEnum.Repair) {
        repair = faker.helpers.arrayElement(repairs);
      } else if (reason === AppointmentReasonEnum.MotorcycleTrial) {
        motorcycleTrial = faker.helpers.arrayElement(motorcycleTrials);
      }

      const appointment = this.appointmentRepository.create({
        user,
        company,
        startTime,
        endTime,
        appointmentStatus,
        reason,
        location,
        maintenance,
        repair,
        motorcycleTrial,
      });

      appointments.push(appointment);
    }

    await this.appointmentRepository.save(appointments);
    console.log(`${appointments.length} appointment records have been created.`);
  }
}
