import {BreakdownRepositoryInterface } from "@application/repositories/BreakdownRepositoryInterface";
import { RepairEntity } from "@domain/entities/repair/RepairEntity";

export class AddRepairToBreakdownUsecase {
  constructor(private readonly breakdownRepository: BreakdownRepositoryInterface) {}

  public async execute(
    breakdownId: string,
    repair: RepairEntity,
  ): Promise<void | Error> {

    const breakdown = await this.breakdownRepository.findOneById(breakdownId);

    if(breakdown instanceof Error) return breakdown
    
    breakdown.addRepair(repair);
    await this.breakdownRepository.save(breakdown);
  }
}
