import { ConcessionRepositoryInterface } from "@application/repositories/ConcessionRepositoryInterface";
import { ConcessionEntity } from "@domain/entities/concession/ConcessionEntity";
import { UnexpectedError } from "@domain/errors/user/UnexpectedError";

export class UpdateConcessionNameUsecase {
  public constructor(
    private readonly concessionRepository: ConcessionRepositoryInterface
  ) {}

  public async execute(
    concessionId: string,
    newNameValue: string
  ): Promise<ConcessionEntity | Error> {
    try {
      const concession = await this.concessionRepository.findById(concessionId);
      if (concession instanceof Error) return concession;

      const updatedName = concession.updateName(newNameValue);
      if (updatedName instanceof Error) return updatedName;

      await this.concessionRepository.save(concession);
      return concession;
    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
