import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SparePart } from '@infrastructure/spare-parts/spare-part.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class SparePartSeeder {
  constructor(
    @InjectRepository(SparePart)
    private readonly sparePartRepository: Repository<SparePart>,
  ) {}

  async seedSpareParts(count: number = 10): Promise<void> {
    const spareParts: SparePart[] = [];

    for (let i = 0; i < count; i++) {
      const sparePart = this.sparePartRepository.create({
        name: faker.commerce.productName().substring(0, 50),
        quantityInStock: faker.number.int({ min: 1, max: 100 }),
        criticalLevel: faker.number.int({ min: 10, max: 20 }),
        cost: faker.number.float({ min: 5, max: 500})
      });

      spareParts.push(sparePart);
    }

    await this.sparePartRepository.save(spareParts);
    console.log(`${count} spare parts have been created.`);
  }
}
