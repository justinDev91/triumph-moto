import { CompanyRepositoryInterface } from '@application/repositories/CompanyRepositoryInterface';
import { UnexpectedError } from '@domain/errors/user/UnexpectedError';

export class RemoveDriverFromCompanyUsecase {
    public constructor(private readonly companyRepository: CompanyRepositoryInterface) {}
  
    public async execute(companyId: string, driverId: string): Promise<void | Error> {
      try {
        const company = await this.companyRepository.findById(companyId);
        if (company instanceof Error)  return company
        
        company.removeDriver(driverId);

        return await this.companyRepository.removeDriver(companyId, driverId);

      } catch (error) {
        return new UnexpectedError(error instanceof Error ? error.message : String(error));
      }
    }
  }
  