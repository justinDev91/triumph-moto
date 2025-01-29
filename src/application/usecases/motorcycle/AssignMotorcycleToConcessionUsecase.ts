import { ConcessionRepositoryInterface } from "@application/repositories/ConcessionRepositoryInterface";
import { MotorcycleRepositoryInterface } from "@application/repositories/MotorcycleRepositoryInterface";

export class AssignMotorcycleToConcessionUsecase {
  constructor(
    private readonly motorcycleRepository: MotorcycleRepositoryInterface,
    private readonly concessionRepository: ConcessionRepositoryInterface
  ) {}

  public async execute(
    motorcycleId: string,
    concessionId: string
  ): Promise<void | Error> {
    const motorcycle = await this.motorcycleRepository.findById(motorcycleId);
    if (motorcycle instanceof Error) return motorcycle;

    const concession = await this.concessionRepository.findById(concessionId);
    if (concession instanceof Error) return concession;

    motorcycle.assignToConcession(concession);

    await this.motorcycleRepository.update(motorcycle);
  }
}
