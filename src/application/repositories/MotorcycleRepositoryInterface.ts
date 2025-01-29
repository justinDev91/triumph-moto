import { MotorcycleEntity } from "@domain/entities/motorcycle/MotorcycleEntity";

export interface MotorcycleRepositoryInterface {
  save(motorcycle: MotorcycleEntity): Promise<void>;
  findAll(): Promise<MotorcycleEntity[] | Error>;
  findById(id: string): Promise<MotorcycleEntity | Error>;
  delete(id: string): Promise<void>;
  update(appointment: MotorcycleEntity): Promise<void>;
}
