import { CompanyEntity } from "@domain/entities/company/CompanyEntity";
import { Company } from "@api/companies/company.entity";
import { toDomainUser } from "../user/to-domain-user";
import { UserEntity } from "@domain/entities/user/UserEntity";

export const toDomainCompany = (companyOrm: Company): CompanyEntity | Error => {
  const companyEntity = CompanyEntity.create(
    companyOrm.id,
    companyOrm.name,
    companyOrm.user ? toDomainUser(companyOrm.user) as UserEntity : null,
    companyOrm.createdAt,
    companyOrm.updatedAt,
    //extends the classe CompanyEntity to allow to send these proprieties
    //companyOrm.motorcycles
    //companyOrm.drivers
    //companyOrm.concessions
  );
  
  return companyEntity;
};
