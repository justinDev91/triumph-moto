import { MotorcycleTrialRepositoryInterface } from "@application/repositories/MotorcycleTrialRepositoryInterface";

export class GetMotorcycleTrialSummaryUsecase {
  constructor(private readonly motorcycleTryRepository: MotorcycleTrialRepositoryInterface) {}

  public async execute(id: string): Promise<string | Error> {
    const motorcycleTry = await this.motorcycleTryRepository.findById(id);
    
    if(motorcycleTry instanceof Error) return motorcycleTry

    return motorcycleTry.getTestSummary();
  }
}
