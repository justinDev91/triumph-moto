import { DriverEntity } from "@domain/entities/driver/DriverEntity";
import { DriverNotFoundError } from "@domain/errors/driver/DriverNotFoundError";

export interface DriverRepositoryInterface {
  create(driver: DriverEntity): Promise<DriverEntity | Error>;
  save(driver: DriverEntity): Promise<void>;
  findOneById(id: string): Promise<DriverEntity | DriverNotFoundError>;
  findAllByUser(id: string): Promise<DriverEntity[] | DriverNotFoundError >;
  delete(id: string): Promise<void>;
  findAll(): Promise<DriverEntity[]>;
}
