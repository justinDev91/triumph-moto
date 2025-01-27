import { CompanyEntity } from "@domain/entities/company/CompanyEntity";
import { ConcessionEntity } from "@domain/entities/concession/ConcessionEntity";
import { CompanyNotFoundError } from "src/domain/errors/company/CompanyNotFoundError";

export interface CompanyRepositoryInterface {
  save(company: CompanyEntity): Promise<void>;
  update(company: CompanyEntity): Promise<void>;
  findById(identifier: string): Promise<CompanyEntity | CompanyNotFoundError>;
  findByName(name: string): Promise<CompanyEntity | CompanyNotFoundError>;
  addConcessionToCompany(companyId: string, concession: ConcessionEntity): Promise<void>;
  removeConcessionFromCompany(companyId: string, concessionId: string): Promise<void>;
}
