import { BreakdownEntity } from "@domain/entities/breakdown/BreakdownEntity";

export interface BreakdownRepositoryInterface {
  save(breakdown: BreakdownEntity): Promise<void>;
  findOneById(id: string): Promise<BreakdownEntity | Error>;
  findByMotorcycleId(motorcycleId: string): Promise<BreakdownEntity[] | Error>;
  delete(id: string): Promise<void>;
  findAll(): Promise<BreakdownEntity[]>;
  updateDescription(id: string, description: string): Promise<void>;
}
