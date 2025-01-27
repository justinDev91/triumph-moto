import { ConcessionRepositoryInterface } from "@application/repositories/ConcessionRepositoryInterface";
import { CompanyEntity } from "@domain/entities/company/CompanyEntity";
import { ConcessionEntity } from "@domain/entities/concession/ConcessionEntity";
import { UserEntity } from "@domain/entities/user/UserEntity";
import { UnexpectedError } from "@domain/errors/user/UnexpectedError";

export class CreateConcessionUsecase {
  public constructor(
    private readonly concessionRepository: ConcessionRepositoryInterface
  ) {}

  public async execute(
    id: string,
    name: string,
    user: UserEntity,
    company: CompanyEntity,
    createdAt: Date,
    updatedAt: Date
  ): Promise<ConcessionEntity | Error> {
    try {
      const newConcession = ConcessionEntity.create(id, name, user, company, createdAt, updatedAt);
      if (newConcession instanceof Error) return newConcession;

      await this.concessionRepository.save(newConcession);
      return newConcession;
    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}



