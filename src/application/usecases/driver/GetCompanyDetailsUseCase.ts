import { Injectable } from '@nestjs/common';
import { DriverRepositoryImplem } from '@adapters/driver.repository.implem';
import { CompanyNotFoundError } from '@domain/errors/company/CompanyNotFoundError';
import { DriverNotFoundError } from '@domain/errors/driver/DriverNotFoundError';

@Injectable()
export class GetCompanyDetailsUseCase {
  constructor(
    private readonly driverRepository: DriverRepositoryImplem,
  ) {}

  async execute(driverId: string): Promise<object | Error> {
    const driver = await this.driverRepository.findOneById(driverId);

    if (driver instanceof Error) return new DriverNotFoundError();
    
    const companyDetails = driver.getCompanyDetails();

    if (!companyDetails) return new CompanyNotFoundError();

    return companyDetails;
  }
}
