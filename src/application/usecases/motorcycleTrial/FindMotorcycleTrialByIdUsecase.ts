import { MotorcycleTrialRepositoryInterface } from "@application/repositories/MotorcycleTrialRepositoryInterface";
import { MotorcycleTrialEntity } from "@domain/entities/motorcycle/MotorcycleTrialEntity";
import { MotorcycleTrialNotFoundError } from "@domain/errors/motorcycle/MotorcycleTrialNotFoundError";

export class FindMotorcycleTrialByIdUsecase {
  constructor(private readonly motorcycleTrialRepository: MotorcycleTrialRepositoryInterface) {}

  public async execute(id: string): Promise<MotorcycleTrialEntity | Error> {
    const motorcycleTrial = await this.motorcycleTrialRepository.findById(id);

    if (!motorcycleTrial) return new MotorcycleTrialNotFoundError();

    return motorcycleTrial;
  }
}
