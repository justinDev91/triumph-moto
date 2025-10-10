import { ConcessionRepositoryInterface } from "@application/repositories/ConcessionRepositoryInterface";
import { UnexpectedError } from "@domain/errors/user/UnexpectedError";

export class RemoveMotorcycleFromConcessionUsecase {
    public constructor(
      private readonly concessionRepository: ConcessionRepositoryInterface
    ) {}
  
    public async execute(
      concessionId: string,
      motorcycleId: string
    ): Promise<void | Error> {
      try {
        const concession = await this.concessionRepository.findById(concessionId);
        if (concession instanceof Error) return concession;
  
        concession.removeMotorcycle(motorcycleId);
        return await this.concessionRepository.removeMotorcycle(concessionId, motorcycleId);
      } catch (error) {
        return new UnexpectedError(error instanceof Error ? error.message : String(error));
      }
    }
  }