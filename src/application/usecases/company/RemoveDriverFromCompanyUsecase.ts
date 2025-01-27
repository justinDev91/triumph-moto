import { CompanyRepositoryInterface } from '@application/repositories/CompanyRepositoryInterface';
import { CompanyEntity } from '@domain/entities/company/CompanyEntity';
import { UnexpectedError } from '@domain/errors/user/UnexpectedError';

export class RemoveDriverFromCompanyUsecase {
    public constructor(private readonly companyRepository: CompanyRepositoryInterface) {}
  
    public async execute(company: CompanyEntity, driverId: string): Promise<CompanyEntity | Error> {
      try {
        company.removeDriver(driverId);
        await this.companyRepository.update(company);
  
        return company;
      } catch (error) {
        return new UnexpectedError(error instanceof Error ? error.message : String(error));
      }
    }
  }
  