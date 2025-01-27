import { Injectable } from '@nestjs/common';
import { CompanyNotFoundError } from '@domain/errors/company/CompanyNotFoundError';
import { DriverEntity } from '@domain/entities/driver/DriverEntity';

@Injectable()
export class GetCompanyDetailsUseCase {
  execute(driver: DriverEntity): object | Error {
    const companyDetails = driver.getCompanyDetails();

    if (!companyDetails) return new CompanyNotFoundError();

    return companyDetails;
  }
}
