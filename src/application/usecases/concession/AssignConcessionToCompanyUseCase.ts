import { ConcessionRepositoryInterface } from "@application/repositories/ConcessionRepositoryInterface";
import { CompanyRepositoryInterface } from "@application/repositories/CompanyRepositoryInterface";

export class AssignConcessionToCompanyUseCase {
  constructor(
    private readonly concessionRepository: ConcessionRepositoryInterface,
    private readonly companyRepository: CompanyRepositoryInterface
  ) {}

  async execute(concessionId: string, companyId: string): Promise<void | Error> {
    const concession = await this.concessionRepository.findById(concessionId);
    if (concession instanceof Error) return concession
    
    const company = await this.companyRepository.findById(companyId);

    if (company instanceof Error) throw company
  
    company.addConcession(concession);

    await this.concessionRepository.save(concession);
    await this.companyRepository.save(company);
  }
}
