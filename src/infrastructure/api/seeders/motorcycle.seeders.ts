import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Motorcycle } from '@api/motorcycles/motorcycle.entity';
import { MotorStatusEnum } from '@api/types/MotorStatusEnum';
import { Company } from '@api/companies/company.entity';
import { Concession } from '@api/concessions/concession.entity';
import { faker } from '@faker-js/faker';
import { MotorcycleBrand } from '@domain/values/motorcycle/MotorcycleBrand';
import { MotorcycleModel } from '@domain/values/motorcycle/MotorcycleModel';
import { MotorcycleYear } from '@domain/values/motorcycle/MotorcycleYear';

@Injectable()
export class MotorcycleSeeder {
  constructor(
    @InjectRepository(Motorcycle)
    private readonly motorcycleRepository: Repository<Motorcycle>,
   
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    
    @InjectRepository(Concession)
    private readonly concessionRepository: Repository<Concession>,
  ) {}

  async seedMotorcycles(count: number = 10): Promise<void> {
    const companies = await this.companyRepository.find({ take: 20 });
    const concessions = await this.concessionRepository.find({ take: 20 });

    if (companies.length === 0 || concessions.length === 0) {
      console.log('No companies or concessions found in the database!');
      return;
    }

    const motorcycles: Motorcycle[] = [];

    for (let i = 0; i < count; i++) {
      const brandValue = faker.company.name();
      const brandOrError = MotorcycleBrand.from(brandValue);
      if (brandOrError instanceof Error) {
        console.error(`Invalid brand: ${brandValue}`);
        continue;
      }

      const modelValue = faker.vehicle.model();
      const modelOrError = MotorcycleModel.from(modelValue);
      if (modelOrError instanceof Error) {
        console.error(`Invalid model: ${modelValue}`);
        continue;
      }

      const yearValue = faker.date.past({years: 20}).getFullYear();
      const yearOrError = MotorcycleYear.from(yearValue);
      if (yearOrError instanceof Error) {
        console.error(`Invalid year: ${yearValue}`);
        continue;
      }

      const mileage = faker.number.int({ min: 1000, max: 100000 });
      const status = faker.helpers.arrayElement([
        MotorStatusEnum.Available,
        MotorStatusEnum.InMaintenance,
        MotorStatusEnum.OnTest,
        MotorStatusEnum.Sold,
      ]);

      const purchaseDate = faker.date.past({years: 5});
      const lastServiceDate = faker.date.past({years: 1});
      const nextServiceMileage = mileage + faker.number.int({ min: 1000, max: 10000 });

      const motorcycle = this.motorcycleRepository.create({
        brand: brandOrError.value,
        model: modelOrError.value,
        year: yearOrError.value,
        mileage,
        status,
        purchaseDate,
        lastServiceDate,
        nextServiceMileage,
        company: faker.helpers.arrayElement(companies),
        concession: faker.helpers.arrayElement(concessions),
      });

      motorcycles.push(motorcycle);
    }

    await this.motorcycleRepository.save(motorcycles);
    console.log(`${motorcycles.length} motorcycles have been created.`);
  }
}
