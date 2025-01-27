import { MotorcycleRepositoryInterface } from "@application/repositories/MotorcycleRepositoryInterface";

export class GetMotorcycleConcessionDetailsUsecase {
  constructor(private readonly motorcycleRepository: MotorcycleRepositoryInterface) {}

  public async execute(motorcycleId: string): Promise<object | null | Error> {
    const motorcycle = await this.motorcycleRepository.findOneById(motorcycleId);
    if (motorcycle instanceof Error) return motorcycle;

    return motorcycle.getConcessionDetails();
  }
}
