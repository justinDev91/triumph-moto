import { DriverEntity } from "@domain/entities/driver/DriverEntity";
import { LicenseType } from "@domain/types/motorcycle";
import { Driver } from "@infrastructure/drivers/driver.entity";

export const toDomainDriver = (persistenceDriver: Driver): DriverEntity => {
    return DriverEntity.create(
      persistenceDriver.id,
      persistenceDriver.name,
      persistenceDriver.licenseType as LicenseType,
      persistenceDriver.license,
      persistenceDriver.yearsOfExperience,
      persistenceDriver.email,
      persistenceDriver.phone,
    ) as DriverEntity;
}