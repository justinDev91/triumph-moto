import { CompanyEntity } from "@domain/entities/company/CompanyEntity";
import { DriverEntity } from "@domain/entities/driver/DriverEntity";

export class GetCompanyDriversUsecase {
    public execute(company: CompanyEntity): DriverEntity[] {
      return company.getDrivers();
    }
  }
  