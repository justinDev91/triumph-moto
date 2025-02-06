import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MotorcycleTrial } from '@api/motorcycle-trials/motorcycle-trial.entity';
import { Motorcycle } from '@api/motorcycles/motorcycle.entity';
import { Driver } from '@api/drivers/driver.entity';
import { faker } from '@faker-js/faker';
import { StartDate } from '@domain/values/motorcycle/MotorcycleTrialStartDate';
import { EndDate } from '@domain/values/motorcycle/MotorcycleTrialEndDate';

@Injectable()
export class MotorcycleTrialSeeder {
  constructor(
    @InjectRepository(MotorcycleTrial)
    private readonly motorcycleTrialRepository: Repository<MotorcycleTrial>,

    @InjectRepository(Motorcycle)
    private readonly motorcycleRepository: Repository<Motorcycle>,

    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  async seedMotorcycleTrials(count: number = 10): Promise<void> {
    const motorcycles = await this.motorcycleRepository.find();
    const drivers = await this.driverRepository.find();

    if (motorcycles.length === 0 || drivers.length === 0) {
      console.log('No motorcycles or drivers found in the database!');
      return;
    }

    const motorcycleTrials: MotorcycleTrial[] = [];

    for (let i = 0; i < count; i++) {
      const motorcycle = faker.helpers.arrayElement(motorcycles);
      const driver = faker.helpers.arrayElement(drivers);

      const existingTrial = await this.motorcycleTrialRepository.findOne({
        where: {
          motorcycle: { id: motorcycle.id },
        },
      });

      if (existingTrial) {
        console.log(`Motorcycle ${motorcycle.id} already has an active trial. Skipping...`);
        continue;
      }

      const startDateValue = faker.date.future();
      const startDateOrError = StartDate.from(startDateValue);
      if (startDateOrError instanceof Error) {
        console.error(`Invalid start date: ${startDateValue}`);
        continue;
      }

      const endDateValue = faker.date.soon({ days: 200 });
      const endDateOrError = EndDate.from(startDateValue, endDateValue);
      if (endDateOrError instanceof Error) {
        console.error(`Invalid end date: ${endDateValue}`);
        continue;
      }

      const motorcycleTrial = this.motorcycleTrialRepository.create({
        motorcycle,
        driver,
        startDate: startDateOrError.value,
        endDate: endDateOrError.value,
      });

      motorcycleTrials.push(motorcycleTrial);
    }

    await this.motorcycleTrialRepository.save(motorcycleTrials);
    console.log(`${motorcycleTrials.length} motorcycle trials have been created.`);
  }
}
