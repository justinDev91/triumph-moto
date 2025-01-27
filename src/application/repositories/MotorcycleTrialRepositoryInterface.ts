import { MotorcycleTrialEntity } from "@domain/entities/motorcycle/MotorcycleTrialEntity";
import { MotorcycleTrialNotFoundError } from "@domain/errors/motorcycle/MotorcycleTrialNotFoundError";

export interface MotorcycleTrialRepositoryInterface {
  save(motorcycleTry: MotorcycleTrialEntity): Promise<void>;
  findOneById(id: string): Promise<MotorcycleTrialEntity | MotorcycleTrialNotFoundError>;
  delete(id: string): Promise<void>;
  all(): Promise<MotorcycleTrialEntity[] | MotorcycleTrialNotFoundError>;
}
