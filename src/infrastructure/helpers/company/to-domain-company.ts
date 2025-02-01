import { CompanyEntity } from "@domain/entities/company/CompanyEntity";
import { Company } from "@infrastructure/companies/company.entity";
import { toDomainUser } from "../user/to-domain-user";
import { UserEntity } from "@domain/entities/user/UserEntity";

export const toDomainCompany = (companyOrm: Company): CompanyEntity | Error => {
  console.log("toDomainUser(companyOrm.user) as UserEntity : null",  companyOrm.user ? toDomainUser(companyOrm.user) as UserEntity : null)
  const companyEntity = CompanyEntity.create(
    companyOrm.id,
    companyOrm.name,
    companyOrm.user ? toDomainUser(companyOrm.user) as UserEntity : null,
    companyOrm.createdAt,
    companyOrm.updatedAt
  );
  
  return companyEntity;
};
