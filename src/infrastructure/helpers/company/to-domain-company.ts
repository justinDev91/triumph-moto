import { CompanyEntity } from "@domain/entities/company/CompanyEntity";
import { Company } from "@infrastructure/companies/company.entity";
import { toDomainUser } from "../user/to-domain-user";

export const toDomainCompany = (companyOrm: Company): CompanyEntity | Error => {

    const userEntity = toDomainUser(companyOrm.user); 

    if (userEntity instanceof Error) {
      return userEntity; 
    }

    const companyEntity = CompanyEntity.create(
      companyOrm.id,
      companyOrm.name,
      userEntity,
      companyOrm.createdAt,
      companyOrm.updatedAt,
    );
    return companyEntity;
}