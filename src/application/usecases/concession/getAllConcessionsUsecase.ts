import { ConcessionRepositoryInterface } from "@application/repositories/ConcessionRepositoryInterface";
import { ConcessionEntity } from "@domain/entities/concession/ConcessionEntity";
import { UnexpectedError } from "@domain/errors/user/UnexpectedError";

export class GetAllConcessionsUsecase {
  constructor(private readonly ConcessionRepository: ConcessionRepositoryInterface) {}

  public async execute(): Promise<ConcessionEntity[] | Error> {
    try {
      const concessions = await this.ConcessionRepository.findAll();
      return concessions;
    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
