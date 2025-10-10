import { CompanyRepositoryInterface } from '@application/repositories/CompanyRepositoryInterface';
import { DriverRepositoryInterface } from '@application/repositories/DriverRepositoryInterface';

export class AssignDriverToCompanyUseCase {
  constructor(
    private readonly driverRepository: DriverRepositoryInterface,
    private readonly companyRepository: CompanyRepositoryInterface,
  ) {}

  async execute(driverId: string, companyId: string): Promise<void | Error> {
    const driver = await this.driverRepository.findOneById(driverId);
    const company = await this.companyRepository.findById(companyId);

    if (driver instanceof Error)  return driver
    
    if (company instanceof Error)  return company
    
    driver.assignToCompany(company);

    return await this.driverRepository.assignCompany(driverId, companyId);
  }
}
