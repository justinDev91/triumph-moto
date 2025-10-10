import { DriverEntity } from "@domain/entities/driver/DriverEntity";
import { Driver } from "@api/drivers/driver.entity";
import { toOrmUser } from "../user/to-orm-user";
import { toOrmCompany } from "../company/to-orm-company";

export const toOrmDriver = (driver: DriverEntity): Driver => {
  return {
    name: driver.name.value,
    license: driver.license.value,
    licenseType: driver.licenseType,
    yearsOfExperience: driver.yearsOfExperience.value,
    email: driver.email.value,
    phone: driver.phone.value,
    user: driver.user ? toOrmUser(driver.user) : null, 
    company: driver.company ? toOrmCompany(driver.company) : null, 
  } as Driver;
};