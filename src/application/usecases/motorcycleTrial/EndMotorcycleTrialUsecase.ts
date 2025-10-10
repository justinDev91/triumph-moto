import { MotorcycleTrialRepositoryInterface } from "@application/repositories/MotorcycleTrialRepositoryInterface";

export class EndMotorcycleTrialUsecase {
  constructor(private readonly motorcycleTryRepository: MotorcycleTrialRepositoryInterface) {}

  public async execute(id: string): Promise<void | Error> {

    const endDate = new Date();

    const motorcycleTry = await this.motorcycleTryRepository.findById(id);

    if(motorcycleTry instanceof Error) return motorcycleTry
    
    motorcycleTry.endTest(endDate);

    await this.motorcycleTryRepository.endTrial(id, endDate);
  }
}
