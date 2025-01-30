import { ConcessionRepositoryInterface } from "@application/repositories/ConcessionRepositoryInterface";
import { ConcessionEntity } from "@domain/entities/concession/ConcessionEntity";

export class GetConcessionDetailsUseCase {
  public constructor(
    private readonly concessionRepository: ConcessionRepositoryInterface
  ) {}

  async execute(id: string): Promise<ConcessionEntity | Error> {
    const concession = await this.concessionRepository.findById(id);
    if (concession instanceof Error) return concession;

    return concession.getDetails() as unknown as ConcessionEntity
  }
}
