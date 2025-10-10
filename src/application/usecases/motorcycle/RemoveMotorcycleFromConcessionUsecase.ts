import { MotorcycleRepositoryInterface } from "@application/repositories/MotorcycleRepositoryInterface";

export class RemoveMotorcycleFromConcessionUsecase {
  constructor(private readonly motorcycleRepository: MotorcycleRepositoryInterface) {}

  public async execute(motorcycleId: string): Promise<void | Error> {
    const motorcycle = await this.motorcycleRepository.findById(motorcycleId);
    if (motorcycle instanceof Error) return motorcycle;

    motorcycle.removeFromConcession();

    await this.motorcycleRepository.update(motorcycle);
  }
}
