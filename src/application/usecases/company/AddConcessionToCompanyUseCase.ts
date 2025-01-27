import { CompanyRepositoryInterface } from '@application/repositories/CompanyRepositoryInterface';
import { ConcessionEntity } from "@domain/entities/concession/ConcessionEntity";

export class AddConcessionToCompanyUseCase {
  constructor(
    private readonly companyRepository: CompanyRepositoryInterface
  ) {}

  async execute(concession: ConcessionEntity, companyId: string): Promise<void | Error> {
    const company = await this.companyRepository.findById(companyId);

    if (company instanceof Error) return company

    company.addConcession(concession);

    await this.companyRepository.save(company);
  }
}
