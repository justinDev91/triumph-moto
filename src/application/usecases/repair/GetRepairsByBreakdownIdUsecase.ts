import { RepairRepositoryInterface } from "@application/repositories/RepairRepositoryInterface";
import { RepairEntity } from "@domain/entities/repair/RepairEntity";

export class GetRepairsByBreakdownIdUsecase {
  constructor(private readonly repairRepository: RepairRepositoryInterface) {}

  async execute(breakdownId: string): Promise<RepairEntity[] | Error> {
    return await this.repairRepository.findByBreakdownId(breakdownId);
  }
}
