import { CompanyRepositoryInterface } from '@application/repositories/CompanyRepositoryInterface';

export class RemoveConcessionFromCompanyUseCase {
  constructor(
    private readonly companyRepository: CompanyRepositoryInterface
  ) {}

  async execute(companyId: string, concessionId: string): Promise<void | Error> {
    const company = await this.companyRepository.findById(companyId);
    if (company instanceof Error)  return company
    
    company.removeConcession(concessionId);

    return await this.companyRepository.removeConcession(companyId, concessionId);
  }
}
