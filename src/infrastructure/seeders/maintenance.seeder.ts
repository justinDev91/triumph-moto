import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Maintenance } from '@infrastructure/maintenances/maintenance.entity';
import { Motorcycle } from '@infrastructure/motorcycles/motorcycle.entity';
import { Concession } from '@infrastructure/concessions/concession.entity';
import { faker } from '@faker-js/faker';
import { MaintenanceTypeEnum } from '@infrastructure/types/MaintenanceTypeEnum';
import { MaintenanceIntervalMileage } from '@domain/values/maintenance/MaintenanceIntervalMileage';
import { MaintenanceIntervalTime } from '@domain/values/maintenance/MaintenanceIntervalTime';

@Injectable()
export class MaintenanceSeeder {
  constructor(
    @InjectRepository(Maintenance)
    private readonly maintenanceRepository: Repository<Maintenance>,

    @InjectRepository(Motorcycle)
    private readonly motorcycleRepository: Repository<Motorcycle>,

    @InjectRepository(Concession)
    private readonly concessionRepository: Repository<Concession>,
  ) {}

  async seedMaintenances(count: number = 10): Promise<void> {
    const motorcycles = await this.motorcycleRepository.find();
    const concessions = await this.concessionRepository.find();

    if (motorcycles.length === 0 || concessions.length === 0) {
      console.log('No motorcycles or concessions found in the database!');
      return;
    }

    const maintenances: Maintenance[] = [];

    for (let i = 0; i < count; i++) {
      const motorcycle = faker.helpers.arrayElement(motorcycles);
      const concession = faker.helpers.arrayElement(concessions);

      const existingMaintenance = await this.maintenanceRepository.findOne({
        where: { motorcycle: { id: motorcycle.id }, concession: { id: concession.id } },
      });

      if (existingMaintenance) {
        console.log(`Maintenance already exists for motorcycle ${motorcycle.id} and concession ${concession.id}. Skipping...`);
        continue;
      }

      const maintenanceType = faker.helpers.arrayElement(Object.values(MaintenanceTypeEnum));

      const date = faker.date.past({ years: 1 });

      const mileageAtServiceValue = faker.number.int({ min: 1000, max: 100000 });
      const maintenanceIntervalMileageValue = faker.number.int({ min: 5000, max: 50000 });
      const maintenanceIntervalTimeValue = faker.number.int({ min: 30, max: 365 });

      const maintenanceIntervalMileageOrError = MaintenanceIntervalMileage.from(maintenanceIntervalMileageValue);
      if (maintenanceIntervalMileageOrError instanceof Error) {
        console.error(`Invalid maintenance interval mileage: ${maintenanceIntervalMileageValue}`);
        continue;
      }

      const maintenanceIntervalTimeOrError = MaintenanceIntervalTime.from(maintenanceIntervalTimeValue);
      if (maintenanceIntervalTimeOrError instanceof Error) {
        console.error(`Invalid maintenance interval time: ${maintenanceIntervalTimeValue}`);
        continue;
      }

      const maintenance = this.maintenanceRepository.create({
        motorcycle,
        // concession,
        maintenanceType,
        date,
        cost: parseFloat(faker.commerce.price({ min: 50, max: 500 })),
        mileageAtService: mileageAtServiceValue,
        maintenanceIntervalMileage: maintenanceIntervalMileageOrError.value,
        maintenanceIntervalTime: maintenanceIntervalTimeOrError.value,
      });

      maintenances.push(maintenance);
    }

    await this.maintenanceRepository.save(maintenances);
    console.log(`${maintenances.length} maintenance records have been created.`);
  }
}
