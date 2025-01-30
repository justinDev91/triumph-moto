import { CompanyEntity } from "@domain/entities/company/CompanyEntity";
import { ConcessionEntity } from "@domain/entities/concession/ConcessionEntity";

export interface CompanyRepositoryInterface {
  save(company: CompanyEntity): Promise<void>;
  update(company: CompanyEntity): Promise<void | Error>;
  findById(identifier: string): Promise<CompanyEntity | Error>;
  findByName(name: string): Promise<CompanyEntity | Error>;
  addConcessionToCompany(companyId: string, concession: ConcessionEntity): Promise<void | Error>;
  removeConcessionFromCompany(companyId: string, concessionId: string): Promise<void | Error>;
  findAll(): Promise<CompanyEntity[] | Error>;
}
