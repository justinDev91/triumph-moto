import { BreakdownRepositoryInterface } from "@application/repositories/BreakdownRepositoryInterface";

export class CheckWarrantyCoverageUsecase {
  constructor(private readonly breakdownRepository: BreakdownRepositoryInterface) {}

  public async execute(breakdownId: string, checkDate: Date): Promise<boolean | Error> {
    const breakdown = await this.breakdownRepository.findOneById(breakdownId);

    if(breakdown instanceof Error) return breakdown
    
    return breakdown.isCoveredByWarranty(checkDate);
  }
}
