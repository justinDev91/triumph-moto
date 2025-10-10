import { CompanyRepositoryInterface } from "@application/repositories/CompanyRepositoryInterface";
import { MotorcycleRepositoryInterface } from "@application/repositories/MotorcycleRepositoryInterface";
import { UnexpectedError } from "@domain/errors/user/UnexpectedError";

export class AddMotorcycleToCompanyUsecase {
  public constructor(
    private readonly companyRepository: CompanyRepositoryInterface,
    private readonly motorcycleRepository: MotorcycleRepositoryInterface
  ) {}

  public async execute(companyId: string, motorcycleId: string): Promise< void | Error> {
    try {
      const company = await this.companyRepository.findById(companyId);
      const motorcycle = await this.motorcycleRepository.findById(companyId);

      if (company instanceof Error) return company
      if (motorcycle instanceof Error) return motorcycle

      
      company.addMotorcycle(motorcycle);
      
      return await this.companyRepository.addMotorcycle(companyId, motorcycleId);  

    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
