import { RepairRepositoryInterface } from "@application/repositories/RepairRepositoryInterface";
import { RepairEntity } from "@domain/entities/repair/RepairEntity";
import { Repair } from "@infrastructure/repairs/repair.entity";
import { RepairNotFoundError } from "@domain/errors/repair/RepairNotFoundError";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { toOrmRepair } from "@infrastructure/helpers/repair/to-orm-repair";
import { toDomainRepair } from "@infrastructure/helpers/repair/to-domain-repair";

@Injectable()
export class RepairRepositoryImplementation implements RepairRepositoryInterface {
  constructor(
    private readonly repairRepository: Repository<Repair>
  ) {}

  public async save(repair: RepairEntity): Promise<void> {
    const repairOrm = toOrmRepair(repair); 
    await this.repairRepository.save(repairOrm);
  }

  public async findById(id: string): Promise<RepairEntity | Error> {
    const repairOrm = await this.repairRepository.findOne({
      where: { id },
      relations: ["breakdown", "cost"],
    });

    if (!repairOrm) {
      return new RepairNotFoundError();
    }

    return toDomainRepair(repairOrm); 
  }

  public async findByBreakdownId(breakdownId: string): Promise<RepairEntity[] | RepairNotFoundError> {
    const repairsOrm = await this.repairRepository.find({
      where: { breakdown: { id: breakdownId } },
      relations: ["breakdown", "cost"],
    });

    if (repairsOrm.length === 0) {
      return new RepairNotFoundError();
    }

    return repairsOrm.map((repairOrm) => toDomainRepair(repairOrm)) as RepairEntity[]; 
  }

  public async deleteById(id: string): Promise<void> {
    const repairOrm = await this.repairRepository.findOne({ where: { id } });

    if (!repairOrm) {
      throw new RepairNotFoundError();
    }

    await this.repairRepository.remove(repairOrm);
  }

  public async update(repair: RepairEntity): Promise<void> {
    const repairOrm = await this.repairRepository.findOne({ where: { id: repair.id } });

    if (!repairOrm) {
      throw new RepairNotFoundError();
    }

    const updatedRepairOrm = toOrmRepair(repair); 
    await this.repairRepository.save(updatedRepairOrm);
  }
}
