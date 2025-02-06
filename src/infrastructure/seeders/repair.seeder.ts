import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Repair } from '@infrastructure/repairs/repair.entity';
import { Breakdown } from '@infrastructure/breakdowns/breakdown.entity';
import { faker } from '@faker-js/faker';
import { RepairDate } from '@domain/values/repair/RepairDate';
import { RepairCost } from '@domain/values/repair/RepairCost';
import { CommonRepairActionEnum } from '@infrastructure/types/CommonRepairActionEnum';

@Injectable()
export class RepairSeeder {
  constructor(
    @InjectRepository(Repair)
    private readonly repairRepository: Repository<Repair>,

    @InjectRepository(Breakdown)
    private readonly breakdownRepository: Repository<Breakdown>,
  ) {}

  async seedRepairs(count: number = 10): Promise<void> {
    const breakdowns = await this.breakdownRepository.find({ take: 15 });

    if (breakdowns.length === 0) {
      console.log('No breakdowns found in the database!');
      return;
    }

    const repairs: Repair[] = [];

    for (let i = 0; i < count; i++) {
      const repairDateValue = faker.date.soon({ days: 30 });
      const repairDateOrError = RepairDate.from(repairDateValue);
      if (repairDateOrError instanceof Error) {
        console.error(`Invalid repair date: ${repairDateValue}`);
        continue;
      }

      const repairCostValue = faker.number.float({ min: 50, max: 2000 });
      const repairCostOrError = RepairCost.from(repairCostValue);

      if (repairCostOrError instanceof Error) {
        console.error(`Invalid repair cost: ${repairCostValue}`);
        continue;
      }

      const repair = this.repairRepository.create({
        breakdown: faker.helpers.arrayElement(breakdowns),
        repairDate: repairDateOrError.value,
        actions: faker.helpers.arrayElements(
          Object.values(CommonRepairActionEnum),
          faker.number.int({ min: 1, max: 4 }),
        ),
        cost: repairCostOrError.value,
      });

      repairs.push(repair);
    }

    await this.repairRepository.save(repairs);
    console.log(`${repairs.length} repairs have been created.`);
  }
}
