import { ConcessionRepositoryInterface } from "@application/repositories/ConcessionRepositoryInterface";
import { UnexpectedError } from "@domain/errors/user/UnexpectedError";

export class DeleteConcessionUsecase {
  public constructor(
    private readonly concessionRepository: ConcessionRepositoryInterface
  ) {}

  public async execute(id: string): Promise<void | Error> {
    try {
      const concession = await this.concessionRepository.findById(id);
      if (concession instanceof Error) return concession;

      await this.concessionRepository.remove(id);
    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
