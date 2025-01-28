import { CompanyEntity } from "@domain/entities/company/CompanyEntity";
import { DriverEntity } from "@domain/entities/driver/DriverEntity";

export class AssignDriverToCompanyUseCase {
    execute(driver: DriverEntity, company: CompanyEntity): void {
      driver.assignToCompany(company);
    }
}