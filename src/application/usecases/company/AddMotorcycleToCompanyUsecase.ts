import { CompanyRepositoryInterface } from "@application/repositories/CompanyRepositoryInterface";
import { CompanyEntity } from "@domain/entities/company/CompanyEntity";
import { MotorcycleEntity } from "@domain/entities/motorcycle/MotorcycleEntity";
import { UnexpectedError } from "@domain/errors/user/UnexpectedError";

export class AddMotorcycleToCompanyUsecase {
  public constructor(
    private readonly companyRepository: CompanyRepositoryInterface
  ) {}

  public async execute(companyId: string, motorcycle: MotorcycleEntity): Promise<CompanyEntity | Error> {
    try {
      const company = await this.companyRepository.findById(companyId);

      if (company instanceof Error) return company
      
      company.addMotorcycle(motorcycle);
      await this.companyRepository.update(company);  

      return company;
    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
