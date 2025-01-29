import { MotorcycleTrialRepositoryInterface } from "@application/repositories/MotorcycleTrialRepositoryInterface";

export class DeleteMotorcycleTrialUsecase {
  constructor(private readonly motorcycleTrialRepository: MotorcycleTrialRepositoryInterface) {}

  public async execute(id: string): Promise<void | Error> {
    const motorcycleTrial = await this.motorcycleTrialRepository.findById(id);

    if (motorcycleTrial instanceof Error ) return motorcycleTrial;

    await this.motorcycleTrialRepository.delete(motorcycleTrial.id);
  }
}
