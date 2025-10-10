import { MotorcycleTrialRepositoryInterface } from "@application/repositories/MotorcycleTrialRepositoryInterface";
import { MotorcycleTrialAlreadyCompletedError } from "@domain/errors/motorcycle/MotorcycleTrialAlreadyCompletedError";

export class UpdateMotorcycleTrialUsecase {
  constructor(private readonly motorcycleTrialRepository: MotorcycleTrialRepositoryInterface) {}

  public async execute(id: string, endDate: Date): Promise<void | Error> {
    const motorcycleTrial = await this.motorcycleTrialRepository.findById(id);

    if (motorcycleTrial instanceof Error) return motorcycleTrial;
    
    if (motorcycleTrial.isTestOngoing()) {
      motorcycleTrial.endTest(endDate);
      await this.motorcycleTrialRepository.save(motorcycleTrial);
    } else {
      return new MotorcycleTrialAlreadyCompletedError();
    }
  }
}
