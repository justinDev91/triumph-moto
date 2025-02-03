import { RepairRepositoryInterface } from "@application/repositories/RepairRepositoryInterface";
import { BreakdownRepositoryInterface } from "@application/repositories/BreakdownRepositoryInterface";
import { RepairEntity } from "@domain/entities/repair/RepairEntity";
import { CommonRepairAction } from "@domain/types/motorcycle";
import { RepairExisteError } from "@domain/errors/repair/RepairExisteError";

export class CreateRepairUsecase {
  constructor(
    private readonly repairRepository: RepairRepositoryInterface,
    private readonly breakdownRepository: BreakdownRepositoryInterface
  ) {}

  async execute(
    breakdownId: string,
    repairDateValue: Date,
    actions: CommonRepairAction[],
    costValue: number
  ): Promise<void | Error> {
    try {

      const breakdown = await this.breakdownRepository.findOneById(breakdownId);
      if (breakdown instanceof Error) return breakdown;

      const repair = RepairEntity.create(null, breakdown, repairDateValue, actions, costValue);
      if (repair instanceof Error) return repair;

      repair.associateRepairWithMotorcycle();

      await this.repairRepository.save(repair);

    } catch (error) {
      return new Error(`Failed to create repair: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
}
