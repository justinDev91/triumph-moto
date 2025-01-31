import { ConcessionRepositoryInterface } from "@application/repositories/ConcessionRepositoryInterface";
import { ConcessionEntity } from "@domain/entities/concession/ConcessionEntity";

export class GetConcessionDetailsUseCase {
  public constructor(
    private readonly concessionRepository: ConcessionRepositoryInterface
  ) {}

  async execute(id: string): Promise<ConcessionEntity | Error> {
    return await this.concessionRepository.findById(id);
  }
}
