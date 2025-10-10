import { MotorcycleTrialEntity } from "@domain/entities/motorcycle/MotorcycleTrialEntity";

export interface MotorcycleTrialRepositoryInterface {
  save(motorcycleTry: MotorcycleTrialEntity): Promise<void>;
  findById(id: string): Promise<MotorcycleTrialEntity | Error>;
  delete(id: string): Promise<void>;
  findAll(): Promise<MotorcycleTrialEntity[] | Error>;
  update(motorcycleTry: MotorcycleTrialEntity): Promise<void>;
  endTrial(id: string, endDate: Date):  Promise<void>;
}
