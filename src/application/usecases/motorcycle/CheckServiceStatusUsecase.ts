import { MotorcycleRepositoryInterface } from "@application/repositories/MotorcycleRepositoryInterface";

export class CheckServiceStatusUsecase {
  constructor(private readonly motorcycleRepository: MotorcycleRepositoryInterface) {}

  public async execute(id: string): Promise<boolean | Error> {
    const motorcycle = await this.motorcycleRepository.findById(id);

    if(motorcycle instanceof Error) return motorcycle

    return motorcycle.needsService();
  }
}
