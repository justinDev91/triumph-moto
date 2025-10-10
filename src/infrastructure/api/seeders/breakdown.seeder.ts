import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Breakdown } from '@api/breakdowns/breakdown.entity';
import { Motorcycle } from '@api/motorcycles/motorcycle.entity';
import { Warranty } from '@api/warranties/warranty.entity';
import { Repair } from '@api/repairs/repair.entity';
import { faker } from '@faker-js/faker';
import { BreakdownDescription } from '@domain/values/breakdown/BreakdownDescription';
import { BreakdownReportedDate } from '@domain/values/breakdown/BreakdownReportedDate';
import { CommonRepairActionEnum } from '@api/types/CommonRepairActionEnum';

@Injectable()
export class BreakdownSeeder {
  constructor(
    @InjectRepository(Breakdown)
    private readonly breakdownRepository: Repository<Breakdown>,

    @InjectRepository(Motorcycle)
    private readonly motorcycleRepository: Repository<Motorcycle>,

    @InjectRepository(Warranty)
    private readonly warrantyRepository: Repository<Warranty>,

    @InjectRepository(Repair)
    private readonly repairRepository: Repository<Repair>,
  ) {}

  async seedBreakdowns(count: number = 10): Promise<void> {
    const motorcycles = await this.motorcycleRepository.find();
    const warranties = await this.warrantyRepository.find();

    if (motorcycles.length === 0) {
      console.log('No motorcycles found in the database!');
      return;
    }

    const breakdowns: Breakdown[] = [];

    for (let i = 0; i < count; i++) {
      const motorcycle = faker.helpers.arrayElement(motorcycles);
      const warranty = faker.helpers.arrayElement(warranties) || null;

      const descriptionValue = faker.lorem.sentence(10);
      const descriptionOrError = BreakdownDescription.from(descriptionValue);
      if (descriptionOrError instanceof Error) {
        console.error(`Invalid breakdown description: ${descriptionValue}`);
        continue;
      }

      const reportedDateValue = faker.date.past();
      const reportedDateOrError = BreakdownReportedDate.from(reportedDateValue);
      if (reportedDateOrError instanceof Error) {
        console.error(`Invalid breakdown reported date: ${reportedDateValue}`);
        continue;
      }

      const repairs = Array.from({ length: count }, () => {
        const actions: CommonRepairActionEnum[] = [
          faker.helpers.arrayElement([CommonRepairActionEnum.BatteryReplacement, CommonRepairActionEnum.BrakeReplacement]),
        ];

        return this.repairRepository.create({
          repairDate: faker.date.recent(),
          actions, 
          cost: parseFloat(faker.commerce.price({ min: 20, max: 200 })),
        });
      });

      const breakdown = this.breakdownRepository.create({
        motorcycle,
        description: descriptionOrError.value,
        reportedDate: reportedDateOrError.value,
        warranty,
        repairs, 
      });

      breakdowns.push(breakdown);
    }

    await this.breakdownRepository.save(breakdowns);
    console.log(`${breakdowns.length} breakdown records have been created.`);
  }
}
