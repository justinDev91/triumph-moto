import { RepairRepositoryInterface } from "@application/repositories/RepairRepositoryInterface";
import { RepairEntity } from "@domain/entities/repair/RepairEntity";
import { RepairNotCompletedError } from "@domain/errors/repair/RepairNotCompletedError";

export class UpdateRepairUsecase {
  constructor(private readonly repairRepository: RepairRepositoryInterface) {}

  async execute(repair: RepairEntity): Promise<RepairEntity | Error> {
    if (!repair.isRepairCompleted()) {
      return new RepairNotCompletedError();
    }

    await this.repairRepository.update(repair);

    return repair;
  }
}
