import { BreakdownRepositoryInterface } from "@application/repositories/BreakdownRepositoryInterface";

export class RemoveRepairFromBreakdownUsecase {
  constructor(private readonly breakdownRepository: BreakdownRepositoryInterface) {}

  public async execute(breakdownId: string, repairId: string): Promise<void | Error> {
    const breakdown = await this.breakdownRepository.findOneById(breakdownId);

    if (breakdown instanceof Error) {
      return breakdown;
    }

    const result = breakdown.removeRepair(repairId);

    if (result instanceof Error) {
      return result;
    }

    await this.breakdownRepository.save(breakdown);
  }
}
