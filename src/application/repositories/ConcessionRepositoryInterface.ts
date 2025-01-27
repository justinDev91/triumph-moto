import { ConcessionEntity } from "@domain/entities/concession/ConcessionEntity";
import { ConcessionNotFoundError } from "@domain/errors/concession/ConcessionNotFoundError";

export interface ConcessionRepositoryInterface {
  save(concession: ConcessionEntity): Promise<void>;
  findById(identifier: string): Promise<ConcessionEntity | ConcessionNotFoundError>;
  findAll(): Promise<ConcessionEntity[] | ConcessionNotFoundError>;
  update(concession: ConcessionEntity): Promise<void>;
  remove(identifier: string): Promise<void>;
}
