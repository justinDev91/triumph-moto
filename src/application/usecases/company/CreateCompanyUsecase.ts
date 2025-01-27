import { CompanyRepositoryInterface } from "@application/repositories/CompanyRepositoryInterface";
import { CompanyEntity } from "@domain/entities/company/CompanyEntity";
import { UserEntity } from "@domain/entities/user/UserEntity";
import { UnexpectedError } from "@domain/errors/user/UnexpectedError";

export class CreateCompanyUsecase {
  public constructor(
    private readonly companyRepository: CompanyRepositoryInterface
  ) {}

  public async execute(
    id: string,
    name: string,
    user: UserEntity,
    createdAt: Date,
    updatedAt: Date
  ): Promise<CompanyEntity | Error> {
    try {
      const company = CompanyEntity.create(id, name, user, createdAt, updatedAt);
      if (company instanceof Error) return company;

      await this.companyRepository.save(company);  
      return company;
    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
