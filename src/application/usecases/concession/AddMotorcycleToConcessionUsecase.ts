import { ConcessionRepositoryInterface } from "@application/repositories/ConcessionRepositoryInterface";
import { ConcessionEntity } from "@domain/entities/concession/ConcessionEntity";
import { MotorcycleEntity } from "@domain/entities/motorcycle/MotorcycleEntity";
import { UnexpectedError } from "@domain/errors/user/UnexpectedError";

export class AddMotorcycleToConcessionUsecase {
  public constructor(
    private readonly concessionRepository: ConcessionRepositoryInterface
  ) {}

  public async execute(
    concessionId: string,
    motorcycle: MotorcycleEntity
  ): Promise<ConcessionEntity | Error> {
    try {
      const concession = await this.concessionRepository.findById(concessionId);
      if (concession instanceof Error) return concession;

      concession.addMotorcycle(motorcycle);
      await this.concessionRepository.save(concession);
      return concession;
    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
