import { DriverEntity } from "@domain/entities/driver/DriverEntity";
import { ResponseDriverDto } from "./response-driver.dto";

export const toResponseDriverDto = (driver: DriverEntity): ResponseDriverDto => ({
    id: driver.id, 
    name: driver.name.value,
    licenseType: driver.licenseType,
    license: driver.license.value,
    yearsOfExperience: driver.yearsOfExperience.value,
    email: driver.email.value,
    phone: driver.phone.value
});