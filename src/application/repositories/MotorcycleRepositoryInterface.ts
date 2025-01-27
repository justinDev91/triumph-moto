import { MotorcycleEntity } from "@domain/entities/motorcycle/MotorcycleEntity";
import { MotorcycleNotFoundError } from "@domain/errors/motorcycle/MotorcycleNotFoundError";

export interface MotorcycleRepositoryInterface {
  save(motorcycle: MotorcycleEntity): Promise<void>;
  all(): Promise<MotorcycleEntity[] | MotorcycleNotFoundError>;
  findOneById(id: string): Promise<MotorcycleEntity | MotorcycleNotFoundError>;
  delete(id: string): Promise<void>;
  update(appointment: MotorcycleEntity): Promise<void>;
}
