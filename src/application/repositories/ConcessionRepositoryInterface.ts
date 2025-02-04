import { ConcessionEntity } from "@domain/entities/concession/ConcessionEntity";

export interface ConcessionRepositoryInterface {
  save(concession: ConcessionEntity): Promise<void>;
  findById(identifier: string): Promise<ConcessionEntity | Error>;
  findAll(): Promise<ConcessionEntity[] | Error>;
  update(concession: ConcessionEntity): Promise<void>;
  remove(identifier: string): Promise<void>;
  addMotorcycle(concessionId: string, motorcycleId: string): Promise<void | Error>;
  removeMotorcycle(concessionId: string, motorcycleId:string): Promise<void | Error>;
  addCompany(concessionId:string, companyId: string): Promise<void | Error>;
}
