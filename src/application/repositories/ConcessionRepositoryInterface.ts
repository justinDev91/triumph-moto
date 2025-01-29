import { ConcessionEntity } from "@domain/entities/concession/ConcessionEntity";

export interface ConcessionRepositoryInterface {
  save(concession: ConcessionEntity): Promise<void>;
  findById(identifier: string): Promise<ConcessionEntity | Error>;
  findAll(): Promise<ConcessionEntity[] | Error>;
  update(concession: ConcessionEntity): Promise<void>;
  remove(identifier: string): Promise<void>;
}
