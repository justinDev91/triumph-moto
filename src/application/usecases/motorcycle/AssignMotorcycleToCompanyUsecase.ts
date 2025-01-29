import { CompanyRepositoryInterface } from "@application/repositories/CompanyRepositoryInterface";
import { MotorcycleRepositoryInterface } from "@application/repositories/MotorcycleRepositoryInterface";

export class AssignMotorcycleToCompanyUsecase {
  constructor(
    private readonly motorcycleRepository: MotorcycleRepositoryInterface,
    private readonly companyRepository: CompanyRepositoryInterface
  ) {}

  public async execute(
    motorcycleId: string,
    companyId: string
  ): Promise<void | Error> {
    const motorcycle = await this.motorcycleRepository.findById(motorcycleId);
    if (motorcycle instanceof Error) return motorcycle;

    const company = await this.companyRepository.findById(companyId);
    if (company instanceof Error) return company;

    motorcycle.assignToCompany(company);

    await this.motorcycleRepository.update(motorcycle);
  }
}
