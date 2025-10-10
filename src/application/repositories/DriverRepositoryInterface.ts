import { DriverEntity } from "@domain/entities/driver/DriverEntity";
import { DriverNotFoundError } from "@domain/errors/driver/DriverNotFoundError";

export interface DriverRepositoryInterface {
  create(driver: DriverEntity): Promise<DriverEntity | Error>;
  save(driver: DriverEntity): Promise<void>;
  findOneById(id: string): Promise<DriverEntity | DriverNotFoundError>;
  findAllByUser(id: string): Promise<DriverEntity[] | DriverNotFoundError >;
  delete(id: string): Promise<void>;
  findAll(): Promise<DriverEntity[]>;
  update(driver): Promise<DriverEntity | Error>
  updateExperience(id, year): Promise<DriverEntity | Error>
  addRecord(id: string,  date: Date, motorcycleId: string, type: string, details: string):  Promise<void>;
  updateContactInfo(driverId: string, email: string, phone: string): Promise<void>;
  assignCompany(driverId: string, companyId: string): Promise<void | Error>;
  removeCompany(driverId: string): Promise<void | Error>;
}
