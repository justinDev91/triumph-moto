import { DriverEntity } from "@domain/entities/driver/DriverEntity";

export class RemoveDriverFromCompanyUseCase {
    execute(driver: DriverEntity): void {
        driver.removeFromCompany();
    }
  }