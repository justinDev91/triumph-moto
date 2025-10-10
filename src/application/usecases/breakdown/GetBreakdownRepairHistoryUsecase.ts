import { BreakdownRepositoryInterface } from "@application/repositories/BreakdownRepositoryInterface";
import { RepairEntity } from "@domain/entities/repair/RepairEntity";

export class GetBreakdownRepairHistoryUsecase {
  constructor(private readonly breakdownRepository: BreakdownRepositoryInterface) {}

  public async execute(breakdownId: string): Promise<RepairEntity[] | Error> {
    const breakdown = await this.breakdownRepository.findOneById(breakdownId);

    if(breakdown instanceof Error) return breakdown

    return breakdown.getRepairHistory();
  }
}
