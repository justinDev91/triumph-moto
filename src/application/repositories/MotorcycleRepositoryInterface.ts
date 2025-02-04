import { MotorcycleEntity } from "@domain/entities/motorcycle/MotorcycleEntity";
import { MotorStatus } from "@domain/types/motorcycle";

export interface MotorcycleRepositoryInterface {
  save(motorcycle: MotorcycleEntity): Promise<void>;
  findAll(): Promise<MotorcycleEntity[] | Error>;
  findById(id: string): Promise<MotorcycleEntity | Error>;
  delete(id: string): Promise<void>;
  update(appointment: MotorcycleEntity): Promise<void>;
  updateMileage(id: string, mileage: number): Promise<void> ;
  updateStatus(id: string, newStatus: MotorStatus):  Promise<void> ;
  updateServiceDetails(id: string, newServiceMileage: number, serviceDate: Date): Promise<void> ;
}
