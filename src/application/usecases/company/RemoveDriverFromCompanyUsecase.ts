import { CompanyRepositoryInterface } from '@application/repositories/CompanyRepositoryInterface';
import { CompanyEntity } from '@domain/entities/company/CompanyEntity';
import { UnexpectedError } from '@domain/errors/user/UnexpectedError';

export class RemoveDriverFromCompanyUsecase {
    public constructor(private readonly companyRepository: CompanyRepositoryInterface) {}
  
    public async execute(companyId: string, driverId: string): Promise<CompanyEntity | Error> {
      try {
        const company = await this.companyRepository.findById(companyId);
        if (company instanceof Error)  return company
        
        company.removeDriver(driverId);
        await this.companyRepository.update(company);
  
        return company;
      } catch (error) {
        return new UnexpectedError(error instanceof Error ? error.message : String(error));
      }
    }
  }
  