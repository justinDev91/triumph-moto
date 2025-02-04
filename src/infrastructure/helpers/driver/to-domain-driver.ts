import { DriverEntity } from "@domain/entities/driver/DriverEntity";
import { LicenseType } from "@domain/types/motorcycle";
import { Driver } from "@infrastructure/drivers/driver.entity";
import { toDomainUser } from "../user/to-domain-user";
import { toDomainCompany } from "../company/to-domain-company";
import { CompanyEntity } from "@domain/entities/company/CompanyEntity";
import { UserEntity } from "@domain/entities/user/UserEntity";

export const toDomainDriver = (driver: Driver): DriverEntity => {
  const domainUser = driver.user ? toDomainUser(driver.user) : null
  const domainCompany = driver.company ? toDomainCompany(driver.company) : null
      
    return DriverEntity.create(
      driver.id,
      driver.name,
      driver.licenseType as LicenseType,
      driver.license,
      driver.yearsOfExperience,
      driver.email,
      driver.phone,
      driver.createdAt,
      driver.updatedAt,
      domainCompany as CompanyEntity,
      domainUser as UserEntity,

    ) as DriverEntity;
}