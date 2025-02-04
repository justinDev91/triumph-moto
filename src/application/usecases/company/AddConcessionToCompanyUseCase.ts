import { CompanyRepositoryInterface } from '@application/repositories/CompanyRepositoryInterface';
import { ConcessionRepositoryInterface } from '@application/repositories/ConcessionRepositoryInterface';

export class AddConcessionToCompanyUseCase {
  constructor(
    private readonly companyRepository: CompanyRepositoryInterface,
    private readonly concessionRepository: ConcessionRepositoryInterface,
  ) {}

  async execute(companyId: string, concessionId: string): Promise<void | Error> {
    const company = await this.companyRepository.findById(companyId);
    const concession = await this.concessionRepository.findById(concessionId);

    if (company instanceof Error) return company;
    if(concession instanceof Error) return concession;

    company.addConcession(concession);

    return await this.companyRepository.addConcession(companyId, concessionId);
  }
}
