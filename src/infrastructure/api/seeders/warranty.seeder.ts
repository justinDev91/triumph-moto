import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warranty } from '@api/warranties/warranty.entity';
import { Motorcycle } from '@api/motorcycles/motorcycle.entity'; 
import { faker } from '@faker-js/faker';

@Injectable()
export class WarrantySeeder {
  constructor(
    @InjectRepository(Warranty)
    private readonly warrantyRepository: Repository<Warranty>,

    @InjectRepository(Motorcycle)  
    private readonly motorcycleRepository: Repository<Motorcycle>,
  ) {}

  async seedWarranties(count: number = 10): Promise<void> {
    const motorcycles = await this.motorcycleRepository.find();

    if (motorcycles.length === 0) {
      console.log('No motorcycles found in the database!');
      return;
    }

    const warranties: Warranty[] = [];

    for (let i = 0; i < count; i++) {
      const warranty = this.warrantyRepository.create({
        motorcycle: faker.helpers.arrayElement(motorcycles),
        startDate: faker.date.recent(),
        endDate: new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000),
        coverageDetails: faker.lorem.sentence(),
      });

      warranties.push(warranty);
    }

    await this.warrantyRepository.save(warranties);
    console.log(`${count} warranties have been created.`);
  }
}
