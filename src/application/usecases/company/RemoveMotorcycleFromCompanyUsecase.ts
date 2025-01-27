import { CompanyRepositoryInterface } from "@application/repositories/CompanyRepositoryInterface";
import { CompanyEntity } from "src/domain/entities/company/CompanyEntity";
import { UnexpectedError } from "src/domain/errors/user/UnexpectedError";

export class RemoveMotorcycleFromCompanyUsecase {
  public constructor(
    private readonly companyRepository: CompanyRepositoryInterface
  ) {}

  public async execute(company: CompanyEntity, motorcycleId: string): Promise<CompanyEntity | Error> {
    try {
      company.removeMotorcycle(motorcycleId);
      await this.companyRepository.update(company); 

      return company;
    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
