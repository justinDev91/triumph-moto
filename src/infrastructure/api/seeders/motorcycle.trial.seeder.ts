import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MotorcycleTrial } from '@api/motorcycle-trials/motorcycle-trial.entity';
import { Motorcycle } from '@api/motorcycles/motorcycle.entity';
import { Driver } from '@api/drivers/driver.entity';
import { faker } from '@faker-js/faker';
import { StartDate } from '@domain/values/motorcycle/MotorcycleTrialStartDate';
import { EndDate } from '@domain/values/motorcycle/MotorcycleTrialEndDate';
import { MotorStatusEnum } from '@api/types/MotorStatusEnum';
import { LicenseTypeEnum } from '@api/types/LicenseTypeEnum';

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
    const motorcycles: Motorcycle[] = [];
    const drivers: Driver[] = [];

    for (let i = 0; i < 10; i++) {
      const motorcycle = this.motorcycleRepository.create({
        brand: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        year: faker.date.past({ years: 20 }).getFullYear(),
        mileage: faker.number.int({ min: 1000, max: 100000 }),
        status: faker.helpers.arrayElement([
          MotorStatusEnum.Available,
          MotorStatusEnum.InMaintenance,
          MotorStatusEnum.OnTest,
          MotorStatusEnum.Sold,
        ]),
        purchaseDate: faker.date.past({ years: 5 }),
        lastServiceDate: faker.date.past({ years: 1 }),
        nextServiceMileage: faker.number.int({ min: 1000, max: 10000 }),
      });
      motorcycles.push(motorcycle);
    }
    await this.motorcycleRepository.save(motorcycles);

    for (let i = 0; i < 10; i++) {
      const driver = this.driverRepository.create({
        name: faker.person.fullName(),
        license: faker.string.alphanumeric(10).toUpperCase(),
        licenseType: faker.helpers.arrayElement(Object.values(LicenseTypeEnum)),
        yearsOfExperience: faker.number.int({ min: 1, max: 30 }),
        email: faker.internet.email(),
        phone: faker.phone.number(),
      });
      drivers.push(driver);
    }
    await this.driverRepository.save(drivers);

    const motorcycleTrials: MotorcycleTrial[] = [];
    for (let i = 0; i < count; i++) {
      const motorcycle = faker.helpers.arrayElement(motorcycles);
      const driver = faker.helpers.arrayElement(drivers);

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
