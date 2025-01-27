import { RepairRepositoryInterface } from "@application/repositories/RepairRepositoryInterface";
import { RepairEntity } from "@domain/entities/repair/RepairEntity";
import { BreakdownEntity } from "@domain/entities/breakdown/BreakdownEntity";
import { CommonRepairAction } from "@domain/types/motorcycle";
import { RepairExisteError } from "@domain/errors/repair/RepairExisteError";

export class CreateRepairUsecase {
  constructor(private readonly repairRepository: RepairRepositoryInterface) {}

  async execute(
    id: string,
    breakdown: BreakdownEntity,
    repairDateValue: Date,
    actions: CommonRepairAction[],
    costValue: number
  ): Promise<RepairEntity | Error> {
    const existingRepair = await this.repairRepository.findById(id);
    if (existingRepair) {
      return new RepairExisteError();
    }

    const repair = RepairEntity.create(id, breakdown, repairDateValue, actions, costValue);
    if (repair instanceof Error) return repair;

    repair.associateRepairWithMotorcycle();

    await this.repairRepository.save(repair);

    return repair;
  }
}
