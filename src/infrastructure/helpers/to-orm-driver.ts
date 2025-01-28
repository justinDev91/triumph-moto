import { DriverEntity } from "@domain/entities/driver/DriverEntity";
import { Driver } from "@infrastructure/drivers/driver.entity";

export const toOrmDriver = (domainDriver: DriverEntity): Driver => {
    return {
      id: domainDriver.id,
      name: domainDriver.name.value,
      license: domainDriver.license.value,
      licenseType: domainDriver.licenseType,
      yearsOfExperience: domainDriver.yearsOfExperience.value,
      email: domainDriver.email.value,
      phone: domainDriver.phone.value,
    } as Driver;
}