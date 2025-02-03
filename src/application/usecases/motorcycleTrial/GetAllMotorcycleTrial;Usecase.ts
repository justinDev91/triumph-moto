import { MotorcycleTrialEntity } from '@domain/entities/motorcycle/MotorcycleTrialEntity';
import { MotorcycleTrialRepositoryInterface } from "@application/repositories/MotorcycleTrialRepositoryInterface";

export class GetAllMotorcyclesTrialUsecase {
  constructor(private readonly motorcycleTrialRepository: MotorcycleTrialRepositoryInterface) {}

  public async execute(): Promise<MotorcycleTrialEntity[] | Error> {
    return await this.motorcycleTrialRepository.findAll();
  }
}
