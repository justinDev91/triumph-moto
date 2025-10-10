import { CompanyRepositoryInterface } from "@application/repositories/CompanyRepositoryInterface";
import { UnexpectedError } from "src/domain/errors/user/UnexpectedError";

export class RemoveMotorcycleFromCompanyUsecase {
  public constructor(
    private readonly companyRepository: CompanyRepositoryInterface,
  ) {}

  public async execute(companyId: string, motorcycleId: string): Promise<void | Error> {
    try {
      const company = await this.companyRepository.findById(companyId);

      if (company instanceof Error)  return company
      
      company.removeMotorcycle(motorcycleId);

      return await this.companyRepository.removeMotorcycle(companyId, motorcycleId); 

    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
