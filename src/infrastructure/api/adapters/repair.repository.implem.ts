import { RepairRepositoryInterface } from "@application/repositories/RepairRepositoryInterface";
import { RepairEntity } from "@domain/entities/repair/RepairEntity";
import { Repair } from "@api/repairs/repair.entity";
import { RepairNotFoundError } from "@domain/errors/repair/RepairNotFoundError";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { toOrmRepair } from "@helpers/repair/to-orm-repair";
import { toDomainRepair } from "@helpers/repair/to-domain-repair";
import { InjectRepository } from "@nestjs/typeorm";
import { Breakdown } from "@api/breakdowns/breakdown.entity";
import { CommonRepairActionEnum } from "@api/types/CommonRepairActionEnum";

@Injectable()
export class RepairRepositoryImplem implements RepairRepositoryInterface {
  constructor(
    @InjectRepository(Repair)
    private readonly repairRepository: Repository<Repair>,

    @InjectRepository(Breakdown)
    private readonly breakdownRepository: Repository<Breakdown>
  ) {}

  async updateActions(repairId: string, newActions: CommonRepairActionEnum[]): Promise<void | Error> {

    const repair = await this.repairRepository.findOne({ where: { id: repairId } });
    if (!repair) return new RepairNotFoundError();

    const updatedActions = [...new Set([...repair.actions, ...newActions])];
    await this.repairRepository.update(repairId, {
      actions: updatedActions,
    });
  }

  public async save(repair: RepairEntity): Promise<void> {
    try {
      const repairOrm = toOrmRepair(repair);
      await this.repairRepository.save(repairOrm);
      
    } catch (error) {
      console.error("Error saving repair:", error);
    }
  }
  
  public async findAll(): Promise<RepairEntity[]> {
    try {
      const repairsOrm = await this.repairRepository.find({
        relations: ["breakdown"], 
      });
  
      if (repairsOrm.length === 0) return []; 
  
      return repairsOrm.map((repairOrm) => toDomainRepair(repairOrm)) as RepairEntity[]; 

    } catch (error) {
      throw new Error("Failed to fetch repairs");
    }
  }

  
  public async findById(id: string): Promise<RepairEntity | Error> {
    const repairOrm = await this.repairRepository.findOne({
      where: { id },
      relations: ["breakdown",],
    });

    if (!repairOrm) {
      return new RepairNotFoundError();
    }

    return toDomainRepair(repairOrm); 
  }

  public async findByBreakdownId(breakdownId: string): Promise<RepairEntity[] | RepairNotFoundError> {
    const repairsOrm = await this.repairRepository.find({
      where: { breakdown: { id: breakdownId } },
      relations: ["breakdown"],
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
