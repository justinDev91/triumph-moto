import { ConcessionRepositoryInterface } from "@application/repositories/ConcessionRepositoryInterface";
import { ConcessionEntity } from "@domain/entities/concession/ConcessionEntity";
import { UnexpectedError } from "@domain/errors/user/UnexpectedError";

export class RemoveMotorcycleFromConcessionUsecase {
  public constructor(
    private readonly concessionRepository: ConcessionRepositoryInterface
  ) {}

  public async execute(concessionId: string, motorcycleId: string): Promise<ConcessionEntity | Error> {
    try {
      const concession = await this.concessionRepository.findById(concessionId);
      if (concession instanceof Error) return concession;

      concession.removeMotorcycle(motorcycleId);

      await this.concessionRepository.update(concession);

      return concession;
    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
