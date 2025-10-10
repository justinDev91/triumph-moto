import { MotorcycleTrialRepositoryInterface } from "@application/repositories/MotorcycleTrialRepositoryInterface";

export class CheckMotorcycleTrialStatusUsecase {
  constructor(private readonly motorcycleTryRepository: MotorcycleTrialRepositoryInterface) {}

  public async execute(id: string): Promise<boolean | Error> {
    const motorcycleTry = await this.motorcycleTryRepository.findById(id);

    if(motorcycleTry instanceof Error) return motorcycleTry

    return motorcycleTry.isTestOngoing();
  }
}
